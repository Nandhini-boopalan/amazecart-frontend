import { 
    clearError, 
    loginFail, 
    loginRequest, 
    loginSuccess ,
registerSuccess,
registerFail,
registerRequest,
loadUserFail,
loadUserSuccess,
loadUserRequest,
logoutFail,
logoutSuccess,
updateProfileRequest,
updateProfileSuccess,
updateProfileFail,
updatePasswordRequest,
updatePasswordSuccess,
updatePasswordFail,
forgotPasswordRequest,
forgotPasswordSuccess,
forgotPasswordFail,
resetPasswordRequest,
resetPasswordSuccess,
resetPasswordFail
} from "../slices/authSlice"
import axios from "axios"

export const login=(email,password)=>async (dispatch)=>{
    try{
       dispatch(loginRequest())
       const {data}=await axios.post('api/v1/login',{email,password})
       dispatch(loginSuccess(data))
    }catch(error){
dispatch(loginFail(error.response.data.message))
    }
}


export const clearAuthError = (dispatch) => {
    dispatch(clearError());
}


export const register=(userData)=>async (dispatch)=>{
    try{
       dispatch(registerRequest())
       const config={
headers:{
    'content-type':'multipart/form-data'
}
       }
       const {data}=await axios.post('/api/v1/register',userData,config)
       dispatch(registerSuccess(data))
    }catch(error){
dispatch(registerFail(error.response.data.message))
    }
}

export const loadUser = async (dispatch, getState) => {
    try {
        console.log('loadUserRequest action dispatched');
        dispatch(loadUserRequest());
        const { data } = await axios.get('/api/v1/myprofile');
        dispatch(loadUserSuccess(data));
    } catch (error) {
        console.error('loadUserRequest action failed:', error);
        dispatch(loadUserFail(error.response.data.message));
    }
};

export const logout = async (dispatch, getState) => {
    try {
        await axios.get('/api/v1/logout');
        dispatch(logoutSuccess());
    } catch (error) {
        
        dispatch(loadUserFail);
    }
};

export const updateProfile=(userData)=>async (dispatch)=>{
    try{
       dispatch(updateProfileRequest())
       const config={
headers:{
    'content-type':'multipart/form-data'
}
       }
       const {data}=await axios.put('/api/v1/update',userData,config)
       dispatch(updateProfileSuccess(data))
    }catch(error){
dispatch(updateProfileFail(error.response.data.message))
    }
}

export const updatePassword=(formData)=>async (dispatch)=>{
    try{
       dispatch(updatePasswordRequest())
       const config={
        headers:{
            'content-type':'application/json'
        }
               }
       
      await axios.put('/api/v1/password/change',formData,config)
       dispatch(updatePasswordSuccess())
    }catch(error){
dispatch(updatePasswordFail(error.response.data.message))
    }
}

export const forgotPassword=(formData)=>async (dispatch)=>{
    try{
       dispatch(forgotPasswordRequest())
       const config={
        headers:{
            'content-type':'application/json'
        }
               }
       
      const {data}=await axios.post('/api/v1/password/forgot',formData,config)
       dispatch(forgotPasswordSuccess(data))
    }catch(error){
dispatch(forgotPasswordFail(error.response.data.message))
    }
}

export const resetPassword=(formData,token)=>async (dispatch)=>{
    try{
       dispatch(resetPasswordRequest())
       const config={
        headers:{
            'content-type':'application/json'
        }
               }
       
      const {data}=await axios.post(`/api/v1/password/reset/${token}`,formData,config)
       dispatch(resetPasswordSuccess(data))
    }catch(error){
dispatch(resetPasswordFail(error.response.data.message))
    }
}



