import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { Container } from "../Container/Container"
import { Input } from "../Input"
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import postService from "../../AppBackendService/post.service";
import { useNavigate } from "react-router-dom";
import { copyWithStructuralSharing } from "@reduxjs/toolkit/query";

export const HomePage=()=>{
    const button=<FaSearch className="text-2xl text-center"/>
    const editButton=<FaEdit/>
    const delButton=<MdDelete/>
    const {register,handleSubmit,reset}=useForm()
    const navigate=useNavigate()
    const [error,setError]=useState("")
    const [buttonText,setButtonText]=useState("Add Task")
    const [posts,setPosts]=useState([]);
    const [editPost,setEditPost]=useState(null);
    const [togglebtn,setToggleBtn]=useState(false);
    const [searchvalue,setSearchValue]=useState("");
    const [isLoading,setIsLoading]=useState(false)
    // const [searchSugg,setSearchSugg]=useState([])
    const authStatus=useSelector((state)=>state.authReducer.status)

    useEffect(()=>{
        const fetchData=async()=>{
            try {
            const getPost=await postService.getAllTodo();
            if(getPost){
                // console.log("Post Data: ",getPost.data);
                
                setPosts(getPost.data)
            }
        } catch (error) {
           setError("No more Post to get !!!")
        }
        }

        if(authStatus){
            fetchData();
        }else{
            navigate("/login")
        }
    },[authStatus,navigate,editPost,togglebtn])

    useEffect(()=>{
        if(editPost){
            reset({
                title:editPost?.title,
                description:editPost?.description
            })
            setButtonText('Update Task')
        }else{
            reset();
            setButtonText('Add Task')
        }
    },[editPost,reset])

    const handleSearch=async(e)=>{
       e.preventDefault();
       const value = e.target.value;
       setSearchValue(value);

        if(value !== ""){
            const filteredPosts = posts.filter((curr) =>
        curr?.title.toLowerCase().includes(value.toLowerCase()))
            setPosts(filteredPosts);
        }else{
            const getPost=await postService.getAllTodo();
            if(getPost){
                setPosts(getPost.data)
            }
        }
    }
    const handlePostData=async(data)=>{
        try {
            if(authStatus && buttonText==='Add Task'){
                setIsLoading(true);
                const addedPost=await postService.createTodo(data);
                if(addedPost){
                    setError("")
                    setPosts((prev)=>[...prev,addedPost.data])
                    reset();
                }
            }else{
                const updatedTask =await postService.updateTodo(data,editPost?._id);
                if(updatedTask){
                    setError("")
                    setPosts((prev)=>{
                        prev.map((curr)=>{
                            curr._id === editPost._id ? updatedTask.data : curr
                        })
                    })
                    reset({
                        title:"",
                        description:""
                    })
                    setEditPost(null)
                }
            }

        } catch (err) {
            setError(err?.response?.data?.message || "failed to add Post !! try again latter")
        }finally{
            setIsLoading(false)
        }
    }

    const handleDeletePost=async(todoId)=>{
        try {
            const deletedPost=await postService.deleteTodo(todoId);
            if(deletedPost){
                setError("");
                setPosts(prev => prev.filter(post => post._id !== todoId));
            }
            
        } catch (error) {
            setError(err?.response?.data?.message || "failed to delete Post !! try again latter")
        }
    }

    const handleTogglebtn=async(todoId)=>{
        try {
            const todo = await postService.toggleCompleteTodo(todoId);
            if(todo){
                setError("");
                setToggleBtn(!togglebtn)
            }
        } catch (error) {
           setError(err?.response?.data?.message || "failed to toggle Post !! try again latter")
        }
    }
    return  (
        <Container>
            <div className="w-7xl h-[70%] flex gap-1.5 justify-center items-center">
           <div className="w-[50%] bg-white p-8 rounded-xl shadow-lg mx-auto h-[100%] text-black">
            <h1 className="text-2xl font-bold mb-6 text-center">ToDo</h1>
            <div className="w-full">
                <form onSubmit={handleSearch} className="flex gap-0 w-[90%] mx-auto relative">
                <Input
                    type="text"
                    placeholder="Search todo..."
                    value={searchvalue}
                    onChange={(e)=>handleSearch(e)}
                    myclassname="px-4 py-2 border-2 border-blue-400 border-r-0 rounded-l-2xl w-full"
                />
                {/* <div className="text-white shadow-2xl absolute top-11 w-[90%] rounded-lg">
                {
                  searchSugg ? searchSugg?.map((curr)=>{
                    return <p key={curr._id} className="p-2 rounded-lg cursor-pointer bg-gray-600 mb-0.5">{curr.title}</p>
                   }):null
                }
                </div> */}

                <Button
                    children={button}
                    type="submit"
                    bgColor="bg-blue-600"
                    myclassname="w-[20%] border border-gray-300 rounded-r-2xl hover:bg-blue-700 flex justify-center items-center cursor-pointer"
                />
                </form>
            </div>

            <div className="w-full">
                <form onSubmit={handleSubmit(handlePostData)} className="w-full">
                    <div className="w-[90%] mx-auto flex flex-col gap-2 justify-center items-center">
                        <Input
                             label="Title Of ToDo: "
                             placeholder="title here..."
                             myclassname="outline-none px-3 py-2 rounded-lg bg-white w-full border-2 border-green-400"
                             labelClass="text-xl font-[600] text-blue-800"
                             {
                                ...register('title',{
                                    required:true
                                })
                             }
                        />
                        <Input
                            label="Description of ToDo"
                            placeholder="description here..."
                            myclassname="outline-none px-3 py-2 rounded-lg bg-white w-full border-2 border-green-400"
                            labelClass="text-xl font-[600] text-blue-800"
                            {
                                ...register('description',{
                                    required:true
                                })
                            }
                        />

                        <Button
                        children={isLoading?"Adding...":buttonText}
                        type="submit"
                        classname="w-[30%] cursor-pointer transition-all duration-200 active:scale-[0.9]"
                        />
                        
                    </div>
                </form>

                {
                    error && <p className="text-red-600 text-xl text-center">{error}</p>
                }
            </div>
            </div>

            <div className="w-5xl h-[100%] bg-white p-8 rounded-xl shadow-lg mx-auto text-black overflow-hidden">
                 <h1 className="text-2xl font-bold mb-6 text-center underline">My ToDo</h1>
                 <ul className="flex flex-col gap-2 overflow-scroll h-full p-4">
                    {
                        posts?.map((post)=>{
                            return  <li key={post?._id} className="bg-gray-300 text-white p-4 flex gap-4 justify-between">
                       <div className="flex gap-4">
                         <div>
                            <Input
                            type="checkbox"
                            checked={post?.isCompleted}
                            onClick={()=>handleTogglebtn(post._id)}
                            myclassname="w-6 h-6 mt-1 cursor-pointer accent-green-500 border-2 border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                             <h1 className={`text-xl font-[700] border-b-2 ${post?.isCompleted ? 'line-through text-gray-500' : 'text-blue-500'}`}>
                        {post?.title}
                        </h1>
                        <p className={`text-gray-800 ${post?.isCompleted ? 'line-through text-gray-500' : ''}`}>
                        {post?.description}
                        </p>
                        </div>
                       </div>
                        <div className="flex gap-4 justify-center items-center">
                            <Button
                            children={editButton}
                            onClick={()=>setEditPost(post)}
                            classname="hover:bg-green-800 cursor-pointer transition-all duration-200 active:scale-[0.94]"
                            />
                            <Button
                            children={delButton}
                            onClick={()=>handleDeletePost(post._id)}
                            bgColor="bg-red-600"
                            classname="hover:bg-red-800 cursor-pointer transition-all duration-200 active:scale-[0.94]"
                            />
                        </div>
                     </li>
                        })
                    }
                   
                 </ul>
            </div>
            </div>
        </Container>
    )
    
}