export const fetchUserData = async (token, userId, dispatch, setUser) => {

  const apiURL = import.meta.env.VITE_BASE_URL;
  try {
    const response = await fetch(
      `${apiURL}/auth/user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          userid: userId,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch user data");
    }

    dispatch(setUser({ user: data, token }));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
