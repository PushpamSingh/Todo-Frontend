import { useState } from "react"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../Button";
import {Input} from "../Input";
import authService from "../../AppBackendService/Auth.service";
import { login, logout } from "../../store/AuthSlice.store";

export const SignupPage=()=>{
    const [error,setError]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {register,handleSubmit}=useForm();
    const [isLoading,setIsLoading]=useState(false)

    const HandleSignUp=async(data)=>{
        const formData={
            username:data?.username || "",
            email:data?.email || "",
            phone:data?.phone || "",
            password:data?.password || "",
            avatar:data?.avatar[0]
        }
        
        // console.log("Form data: ",formData);
        
        try {
            setIsLoading(true)
            const userData=await authService.createUser(formData);
            if(userData){
                dispatch(login(userData))
                navigate('/')
            }else{
                dispatch(logout())
                navigate('/signup')
            }
        } catch (err) {
            setError(err?.response?.data?.message || "failed to signUp !! try again latter")
        }
        finally{
            setIsLoading(false)
        }
    }
    return (
     <div className="bg-gray-300 w-[50%] mx-auto h-[100%]">
            <div className="w-full h-full flex flex-col justify-between">
                <div className="flex justify-center mt-4">
                    <span>
                        <img src="/logo.png" alt="logo" />
                    </span>
                </div>
                <h2 className="text-3xl text-slate-600 font-[700] text-center leading-tight">Sign Up a new account</h2>
               <span className="flex justify-center">
                 <p className="text-slate-500 font-[500] text-center">Already have any account?&nbsp;</p>
                <Link
                to='/login'
                className="font-small text-primary transition-all duration-200 hover:underline"
                >
                LogIn
                </Link>
               </span>

               {
                //TODO Error
                error && <p className="text-red-600 mt-8 text-center">{error}</p>
               }

               <form onSubmit={handleSubmit(HandleSignUp)} className="mt-2 mb-2 w-[70%] mx-auto h-[100%]">
                <div className="flex flex-col gap-4 justify-between">
                     <Input
                     type="text"
                     label="*Full Name: "
                    placeholder="Enter your Name..."
                    {
                        ...register('username',{
                                required:true
                            })
                    }
                    />
                     <Input
                     type="Number"
                     label="*Phone: "
                    placeholder="Enter your Phone..."
                    {
                        ...register('phone',{
                                required:true
                            })
                    }
                    />
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
                    <Input
                    type="file"
                    label="*Avatar: "
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    // placeholder="Enter your password..."
                    {
                        ...register('avatar',{
                            required:true
                        })
                    }
                    />

                    <Button
                        type='submit'
                        children={isLoading?"Saving...":"Sign Up"}
                        classname='w-full cursor-pointer transition-all duration-200 hover:bg-green-500 active:scale-[0.9]'
                    />
                </div>
               </form>


            </div>
        </div>
    )
}