import axios from "axios";
import { authActions } from "../slice/auth-slice";
import { toast } from "sonner"
import axiosInstance from "../../utils/axiosInstance";

export function loginUser(user) {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsLoading());
      const {data}= await axiosInstance.post('/login/',
        user
      );
      console.log(data)
      dispatch(authActions.loginStatut(data.success));
      dispatch(authActions.login(data));
      localStorage.setItem("stage-help-desk", JSON.stringify(data));
      toast("Welcome back " +data.first_name);
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(authActions.cleaarIsLoading());
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.loginStatut(false));
    dispatch(authActions.logout());
    localStorage.removeItem("stage-help-desk");
    toast("Logout has been successful");

  }
}

export function signupUser(user) {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsLoading());
      const { data } = await axiosInstance.post('/signup/`',
        user
      );
      dispatch(authActions.signup(data.success));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(authActions.cleaarIsLoading());
    }
  };
}
