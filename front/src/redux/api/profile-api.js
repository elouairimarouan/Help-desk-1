import { toast } from "sonner"
import axiosInstance from "../../utils/axiosInstance";
import { profileActions } from "../slice/profile-slice";
import { authActions } from "../slice/auth-slice";
export function getUserProfile() {
  return async (dispatch) => {
    try {
      dispatch(profileActions.setLoading())
      const { data } = await axiosInstance.get(`/profile-user/`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'An error occurred');
    } finally{
      dispatch(profileActions.clearLoading())
    }
  };
}
//Uolaad  profile photo
export function uploadProfilePhoto(id, newPhoto) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await axiosInstance.put(
        `/update-profile-image/${id}/`,
        newPhoto,{
          headers: {
            Authorization: "Bearer " + getState().auth.user.access_token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(profileActions.setProfilePhoto(data.profile_image));
      dispatch(authActions.setUserPhoto(data.profile_image));
      const user = JSON.parse(localStorage.getItem("stage-help-desk"));
      user.profile_image = data?.profile_image;
      localStorage.setItem("stage-help-desk", JSON.stringify(user));
      toast(data.message);
    } catch (error) {
      toast(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      dispatch(profileActions.clearLoading());
    }
  };
}
//Update  profile
export function updateProfile(userID, profile) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await axiosInstance.put(
        `/update-profile/${userID}/`,
        profile,
      );
      
      // Dispatch updates to Redux store
      dispatch(profileActions.updateUserProfile(data.user));
      dispatch(authActions.setLastName(data.user.last_name));
      dispatch(authActions.setFirstName(data.user.first_name));
      dispatch(authActions.setEmail(data.user.email));

      // Retrieve and update localStorage correctly
      const userStr = localStorage.getItem("stage-help-desk");
      if (userStr) {
        const user = JSON.parse(userStr); // Parse the string into an object
        user.last_name = data.user.last_name;
        user.first_name = data.user.first_name;
        user.email = data.user.email;
        localStorage.setItem("stage-help-desk", JSON.stringify(user)); // Stringify before saving
      }

      toast.success('Profile has been updated successfully');
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      dispatch(profileActions.clearLoading());
    }
  };
}
// delete profile
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await axiosInstance.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
    } catch (error) {
      toast(error);
      dispatch(profileActions.clearLoading());
    }
  };
}
