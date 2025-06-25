import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import authService from "../../AppBackendService/Auth.service";
import { login, logout } from "../../store/AuthSlice.store";
import {Input} from  './../Input';
import { Button } from "../Button";

export const LoginPage=()=>{
    const [error,setError]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm()

    const HandleLogin=async(data)=>{
        // console.log("Data from login: ",data);
        
        try {
            setIsLoading(true)
            const session=await authService.userLogin(data);
            if(session){
                const userData=await authService.getcurrentUser();
                if(userData){
                    dispatch(login(userData));
                    navigate('/')
                }else{
                    dispatch(logout());
                    navigate("/login")
                }
                
            }
            
        } catch (err) {
            setError(err?.response?.data?.message || "Failed login !! try again latter")
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <div className="bg-gray-300 w-[50%] mx-auto h-[100%]">
            <div className="w-full h-full flex flex-col justify-between">
                <div className="flex justify-center mt-8">
                    <span>
                        <img src="/logo.png" alt="logo" />
                    </span>
                </div>
                <h2 className="text-3xl text-slate-600 font-[700] text-center leading-tight">Sign In to your account</h2>
               <span className="flex justify-center">
                 <p className="text-slate-500 font-[500] text-center">Don&apos;t have any account?&nbsp;</p>
                <Link
                to='/signup'
                className="font-small text-primary transition-all duration-200 hover:underline"
                >
                SignUp
                </Link>
               </span>

               {
                //TODO Error
                error && <p className="text-red-600 mt-8 text-center">{error}</p>
               }

               <form onSubmit={handleSubmit(HandleLogin)} className="mt-8 w-[70%] mx-auto h-[100%]">
                <div className="flex flex-col gap-4 justify-between">
                    <Input
                    type="email"
                    label="*Email: "
                    placeholder="Enter your email..."
                    {
                        ...register('email',{
                            required:true,
                            validate:(value)=>
                                 /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(value) ||
                                "Please Enter valid email"
                        })
                    }               
                    />

                    <Input
                    type="password"
                    label="*Password: "
                    placeholder="Enter your password..."
                    {
                        ...register('password',{
                            required:true
                        })
                    }
                    />

                    <Button
                        type={isLoading?'Saving...':'submit'}
                        children="Sign In"
                        classname='w-full cursor-pointer transition-all duration-200 hover:bg-green-500 active:scale-[0.9]'
                    />
                </div>
               </form>


            </div>
        </div>
    )
}