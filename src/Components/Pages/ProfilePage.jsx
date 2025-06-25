import { User,Mail,Phone,Edit3,Camera,Lock } from "lucide-react";
import { Container } from "../Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/AuthSlice.store";
export const ProfilePage=()=>{
    const [user,setUser]=useState({});
    const userData=useSelector((state)=>state.authReducer.userData);

    const navigate=useNavigate()
    const dispatch=useDispatch();
    useEffect(()=>{
        try {
            if(userData){
            setUser(userData.data)
            }else{
                dispatch(logout())
                navigate('/login')
            }
        } catch (error) {
            throw error;
        }
    },[userData,navigate])
    // console.log("UserData: ",user);
    
  return (
    <Container>
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-5xl mx-auto border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
      </div>

      <div className="flex items-center gap-12">
        {/* Left Side - Profile Picture */}
        <div className="flex-shrink-0">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img 
                    src={user.avatar || "./logo.png"} 
                    alt="Profile" 
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <User className="w-14 h-14 text-gray-400" />
                )}
              </div>
            </div>
            {/* <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
              <Camera className="w-5 h-5 text-white" />
            </div> */}
          </div>
          
          {/* Status Indicator */}
          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Account Active</span>
          </div>
        </div>

        {/* Right Side - Information and Actions */}
        <div className="flex-1">
          {/* User Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Username */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Username</p>
                <p className="text-lg font-bold text-gray-800 truncate">{user?.username}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</p>
                <p className="text-lg font-bold text-gray-800 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Phone - spans full width on mobile, single column on desktop */}
            <div className="md:col-span-2 flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                <p className="text-lg font-bold text-gray-800">{user?.phone}</p>
              </div>
            </div>
          </div>

  
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={()=>navigate('/edit-profile')}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <Edit3 className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
            
            <button
              onClick={()=>navigate('/change-password')}
              className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <Lock className="w-5 h-5" />
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
}