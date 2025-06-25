import { AlertCircle, Mail, Save, User, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../AppBackendService/Auth.service";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/AuthSlice.store";

export const EditProfile=()=>{
    const userData= useSelector((state)=>state.authReducer.userData);
    const navigate =useNavigate();
    const dispatch=useDispatch();
    const [avatar,setAvatar]=useState(null)
    const [username,setUsername]=useState(userData?.data.username);
    const [email,setEmail]=useState(userData?.data.email);
    const [hasChanges,setHasChanges]=useState(false);
    const [isLoading,setIsLoading]=useState(false)
    const [errors, setErrors] = useState({});
    const [apiError,setAPiError]=useState("");
    const validateForm = () => {
        const newError={
            username:"",
            email:"",
            avatar:""
        }
    // Username validation
    if (!username.trim()) {
    //   setErrors(prev => ({ ...prev, username: "Username is required" }));
    newError.username="Username is required"
    } 
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
    //   setErrors(prev=>({...prev,email:"email is required"}))
    newError.email="email is required"
    } else if (!emailRegex.test(email)) {
    //   setErrors(prev => ({ ...prev, email: "Invalid email" }));
    newError.email="Invalid email"
    }

    if(!avatar){
        newError.avatar="Avatar is required"
    }
    setErrors(newError);
    return newError;
  };

  const handleCancel=()=>{
    navigate('/my-profile')
  }
  const handleSave=async()=>{
   try {
     const validate=validateForm();
     if(!validate.username && !validate.email && !validate.avatar){
         setIsLoading(true)
         const updatedUser=await authService.updateUserDetails({email,username,avatar})
         if(updatedUser){
            console.log("Updated user: ",updatedUser);
            
            await dispatch(login(updatedUser?.data))
             setIsLoading(false);
            navigate('/my-profile')
            }
          
     }else{
         setErrors(validate);
     }
   } catch (error) {
    setAPiError(err?.response?.data?.message || "failed to update user !! try again latter")
   }
  }
//   console.log("Avatar: frimL::  ",avatar);
  
     return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Edit Profile</h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        
               {
                apiError && <p className="text-red-600 mt-8 text-center">{apiError}</p>
               }
      </div>

      <div className="space-y-6">
        {/* Username Field */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) {
                  setErrors(prev => ({ ...prev, username: undefined }));
                }
                setHasChanges(true)
              }}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-lg font-medium transition-all duration-200 focus:outline-none ${
                errors.username
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300'
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.username && (
            <p className="text-red-600 text-sm font-medium flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.username}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: undefined }));
                }
                setHasChanges(true)
              }}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-lg font-medium transition-all duration-200 focus:outline-none ${
                errors.email
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.email && (
            <p className="text-red-600 text-sm font-medium flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* avatar field */}
        <div className="space-y-2">
          <label htmlFor="avatar" className="block text-sm font-semibold text-gray-700 mb-2">
            Avatar
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="file"
              id="avatar"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={(e) => {
                setAvatar(e.target.files[0]);
                if (errors.avatar) {
                  setErrors(prev => ({ ...prev, avatar: undefined }));
                }
                setHasChanges(true)
              }}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-lg font-medium transition-all duration-200 focus:outline-none ${
                errors.avatar
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.avatar && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.avatar && (
            <p className="text-red-600 text-sm font-medium flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.avatar}</span>
            </p>
          )}
        </div>

        {/* Changes Indicator */}
        {hasChanges && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-blue-700">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">You have unsaved changes</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <X className="w-5 h-5" />
            <span>Cancel</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={!hasChanges || isLoading}
            className={`flex-1 font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 ${
              !hasChanges || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed transform-none shadow-md'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}