import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("stage-help-desk")
      ? JSON.parse(localStorage.getItem("stage-help-desk"))
      : null,
    signupStatus: false,
    isLoading: false,
    loginStatus: false,
    isEmailVerified: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    signup(state, action) {
      state.signupStatus = action.payload;
    },
    loginStatut(state, action) {
      state.loginStatus = action.payload;
    },
    setUserPhoto(state, action) {
      state.user.profile_image = action.payload;
    },
    setFirstName(state, action) {
      state.user.first_name = action.payload;
    },
    setLastName(state, action) {
      state.user.last_name = action.payload;
    },
    setEmail(state, action) {
      state.user.email = action.payload;
    },
    setAccessToken(state, action) {
      state.user.access_token = action.payload;
    },
    setIsEmailVerified(state) {
      state.isEmailVerified = true;
      state.signupMessage = null;
    },
    setIsLoading(state) {
      state.isLoading = true;
    },
    cleaarIsLoading(state) {
      state.isLoading = false;
    },
  },
});
const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authActions, authReducer };