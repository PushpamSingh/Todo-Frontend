import { AlertCircle, CheckCircle, Eye, EyeOff, Save, Shield, X, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../AppBackendService/Auth.service";
import { login } from "../../store/AuthSlice.store";

export const ChangePassword=()=>{
    const[submitStatus,setSubmitStatus]=useState('idle')
    const[showOldPassword,setShowOldPassword]=useState(false)
    const[showNewPassword,setShowNewPassword]=useState(false)
    const[showConfirmPassword,setShowConfirmPassword]=useState(false)
    const[isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate();
    const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors,isDirty,isValid},
    setError,
    reset
}=useForm({
    mode:'onChange',
    defaultValues:{
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
    }
})
 const newPassword = watch('newPassword');
//   const validatePassword = (value) => {
//     if (value.length < 8) {
//       return 'Password must be at least 8 characters long';
//     }
//     if (!/(?=.*[a-z])/.test(value)) {
//       return 'Password must contain at least one lowercase letter';
//     }
//     if (!/(?=.*[A-Z])/.test(value)) {
//       return 'Password must contain at least one uppercase letter';
//     }
//     if (!/(?=.*\d)/.test(value)) {
//       return 'Password must contain at least one number';
//     }
//     if (!/(?=.*[@$!%*?&])/.test(value)) {
//       return 'Password must contain at least one special character';
//     }
//     return true;
//   };

const onSubmit=async(data)=>{
    setIsLoading(true)
    try {
        const updatedUser=await authService.changePassword(data);
        if(updatedUser){
            setSubmitStatus('success')
            await dispatch(login(updatedUser?.data));
            navigate('/my-profile')
        }
        else{
            setSubmitStatus('error');
            setError('oldPassword', {
                 type: 'manual',
                 message: 'Current password is incorrect'
            });
        }
    } catch (error) {
        setSubmitStatus('error')
        reset()
        setError('root',{
            type:'manual',
            message:error?.response?.data?.message || 'Something went wrong',
        })
    }finally{
        setSubmitStatus('success')
        setIsLoading(false)
        reset()
    }
}
const handleCancel=()=>{
    navigate('/my-profile')
}
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(newPassword || '');
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Change Password</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Keep your account secure by using a strong password. Your new password should be different from your current password.
        </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-red-500 to-pink-600 mx-auto mt-4"></div>
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center space-x-2 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Password changed successfully!</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errors.root && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center space-x-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{errors.root.message}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <div className="space-y-2">
          <label htmlFor="oldPassword" className="block text-sm font-semibold text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showOldPassword ? 'text' : 'password'}
              id="oldPassword"
              {...register('oldPassword', {
                required: 'Current password is required',
                minLength: {
                  value: 1,
                  message: 'Please enter your current password'
                }
              })}
              className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl text-lg font-medium transition-all duration-200 focus:outline-none ${
                errors.oldPassword
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-gray-200 bg-gray-50 focus:border-red-500 focus:ring-4 focus:ring-red-100 hover:border-gray-300'
              }`}
              placeholder="Enter your current password"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-600 text-sm font-medium flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.oldPassword.message}</span>
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              {...register('newPassword', {
                required: 'New password is required',
                // validate: validatePassword
              })}
              className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl text-lg font-medium transition-all duration-200 focus:outline-none ${
                errors.newPassword
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300'
              }`}
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Password Strength:</span>
                <span className={`font-medium ${passwordStrength >= 4 ? 'text-green-600' : passwordStrength >= 3 ? 'text-blue-600' : passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {strengthLabels[passwordStrength - 1] || 'Very Weak'}
                </span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
                      level <= passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          
          {errors.newPassword && (
            <p className="text-red-600 text-sm font-medium flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.newPassword.message}</span>
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (value) => value === newPassword || 'Passwords do not match'
              })}
              className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl text-lg font-medium transition-all duration-200 focus:outline-none ${
                errors.confirmPassword
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-4 focus:ring-green-100 hover:border-gray-300'
              }`}
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm font-medium flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.confirmPassword.message}</span>
            </p>
          )}
        </div>

        {/* Password Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Password Requirements:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${newPassword && newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>At least 8 characters long</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${newPassword && /(?=.*[a-z])/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>One lowercase letter</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${newPassword && /(?=.*[A-Z])/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>One uppercase letter</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${newPassword && /(?=.*\d)/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>One number</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${newPassword && /(?=.*[@$!%*?&])/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>One special character (@$!%*?&)</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <X className="w-5 h-5" />
            <span>Cancel</span>
          </button>
          
          <button
            type="submit"
            disabled={!isValid || !isDirty || isLoading}
            className={`flex-1 font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 ${
              !isValid || !isDirty || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed transform-none shadow-md'
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Changing...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Change Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}