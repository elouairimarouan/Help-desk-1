import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
    name : "profile",
    initialState : {
        profile : null,
        loading : false,
        isProfileDeleted : false,
    },
    reducers : {
         setProfile(state, action){
            state.profile = action.payload
         },
         setProfilePhoto(state, action){
            state.profile.profile_image = action.payload
         },
         updateUserProfile(state, action){
            state.profile = action.payload
         },
         
         setLoading(state){
            state.loading = true
         },
         clearLoading(state){
            state.loading = false
         },
         setIsProfileDeleted(state){
            state.isProfileDeleted = true
            state.loading = false
         },
         clearIsProfileDeleted(state){
            state.isProfileDeleted = false
         },
    }
})
const profileReducer = profileSlice.reducer
const profileActions = profileSlice.actions
export {profileActions, profileReducer}