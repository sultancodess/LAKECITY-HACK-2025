
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice"; // Import Redux action
import { Loader2 } from "lucide-react"; // Import spinner icon

const AuthSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); // ✅ Store user data

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const name = params.get("name")
      ? decodeURIComponent(params.get("name"))
      : "Unknown User";
    const email = params.get("email")
      ? decodeURIComponent(params.get("email"))
      : "No Email";
    const avatar = params.get("avatar")
      ? decodeURIComponent(params.get("avatar"))
      : "https://via.placeholder.com/150";

    if (token && userId) {
      try {
        const user = { _id: userId, name, email, avatar };
        setUserData(user); // ✅ Set user state

        // Store in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", userId);

        // Dispatch to Redux
        dispatch(setUser({ user, token }));

        console.log("User data saved successfully");

        // Redirect user to home
        setTimeout(() => {
          setLoading(false);
          navigate("/", { replace: true });
        }, 1500);
      } catch (err) {
        console.error("Error storing authentication data:", err);
        setError("Authentication failed. Please try again.");
        setLoading(false);
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    } else {
      setError("Missing authentication parameters. Redirecting to login...");
      setLoading(false);
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    }
  }, [navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        {loading ? (
          <>
            <Loader2 className="animate-spin mx-auto text-blue-500 w-10 h-10" />
            <p className="mt-4 text-gray-600 text-lg">
              Authenticating, please wait...
            </p>
          </>
        ) : error ? (
          <>
            <p className="text-red-500 text-lg">{error}</p>
          </>
        ) : (
          <>
            <img
              src={userData?.avatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, {userData?.name}!
            </h2>
            <p className="text-gray-600">{userData?.email}</p>
            <p className="text-green-500 mt-4">
              Authentication successful! Redirecting...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthSuccess;
