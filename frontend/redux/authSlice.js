// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   token: localStorage.getItem("token") || null,
//   userId: localStorage.getItem("userId") || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.userId = action.payload.user._id;

//       // Save to localStorage
//       localStorage.setItem("user", JSON.stringify(action.payload.user));
//       localStorage.setItem("token", action.payload.token);
//       localStorage.setItem("userId", action.payload.user._id);
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.userId = null;

//       // Remove from localStorage
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//     },
//   },
// });

// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (!action.payload?.user || !action.payload?.token) {
        console.error("Invalid user payload received:", action.payload);
        return;
      }

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.user._id;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.user._id);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;

      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
