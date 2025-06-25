import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import authService from "../../AppBackendService/Auth.service";
import { logout } from "../../store/AuthSlice.store";

export const Header=()=>{
    const authStatus=useSelector((state)=>state.authReducer.status)
    // const authStatus=useSelector((state)=>console.log(state.authReducer.status))
    // TODO :-
    const navigate=useNavigate();
    const dispatch=useDispatch();
    // console.log("auth: ",authStatus);
    const [error,setError]=useState("")
    const navItem=[
        {
            name:'Home',
            slug:'/',
            active:true
        },
        {
            name:'LogIn',
            slug:'/login',
            active:!authStatus
        },
        {
            name:'SignUp',
            slug:'/signup',
            active:!authStatus
        },
        {
            name:'MyProfile',
            slug:'/my-profile',
            active:authStatus
        }
    ]

    const logOutUser=async()=>{
        try {
            const response=await authService.userLogOut();
            if(response){
                dispatch(logout());
                navigate('/login')
            }else{
                navigate("/")
            }
        } catch (error) {
            alert(`${error?.message || "something went wrong!!"}`)
        }
    }
    return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-600 text-white shadow-md z-10">
  {/* Left: Logo */}
  <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto space-x-3.5">
    <NavLink to='/' className="flex items-center space-x-3.5">
      <img src="/logo.png" alt="Logo" className="w-8 h-8" />
      <span className="font-semibold text-lg">ToDoApp</span>
    </NavLink>
  </div>

  {/* Right: Navigation Buttons */}
  <nav className="flex flex-wrap justify-center sm:justify-end gap-2">
    {
      navItem.map((curr) =>
        curr.active ? (
          <button
            key={curr.name}
            onClick={() => navigate(curr.slug)}
            className="hover:bg-gray-700 px-3 py-1 rounded transition cursor-pointer"
          >
            {curr.name}
          </button>
        ) : null
      )
    }

    {authStatus && (
      <button
        onClick={logOutUser}
        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
      >
        Logout
      </button>
    )}
  </nav>
</div>

    )
}