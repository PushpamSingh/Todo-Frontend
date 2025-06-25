import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import authService from './AppBackendService/Auth.service.js';
import { login, logout } from './store/AuthSlice.store.js';
import { Header } from './Components/Headers/Header.jsx';
import { Footer } from './Components/Footers/Footer.jsx';
import { Outlet } from 'react-router-dom';

function App() {
  const [isLoading,setIsLoading]=useState(true);
  const dispatch=useDispatch();
  // const authStatus=useSelector((state)=>state.authReducer.status)
  useEffect(()=>{
    const fetchUserData=async()=>{
      try{
        const userData=await authService.getcurrentUser();
        if(userData){
          dispatch(login(userData))
        }else{
          dispatch(logout())
        }
      }finally{
        setIsLoading(false)
      }
    }
    fetchUserData()

  },[])
  return isLoading ? (
    <div className="mx-autu flex w-full h-screen justify-center items-center">
      <h1>loading...</h1>
    </div>
    ) : (
      <div className='max-w-screen h-screen bg-black flex flex-col'>
      <Header/>
      <div className="w-full flex flex-col justify-center h-[100%]">
      <main className='h-[100%] bg-black'>
         {/* <h1 className="text-2xl font-bold text-center text-white">ToDoApp</h1> */}
         <Outlet/>
      
      </main>
      </div>
      <Footer/>
    </div>
    )
 
}
export default App
