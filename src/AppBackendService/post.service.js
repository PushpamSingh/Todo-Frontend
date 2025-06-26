import axios from "axios";

// const baseUrl='https://todo-backend-3t7g.onrender.com/api/v1/todo'

// const baseUrl=`${import.meta.env.VITE_BACKEND_URL}/api/v1/todo`;
// const baseUrl=`/api/v1/todo`;
const API=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL +`/api/v1/todo`,
    withCredentials:true,
})

class PostService{
    async createTodo({title,description}){
        try {
            const createdTodo=await API.post(`/createtodo`,{title,description});
            return createdTodo.data;
        } catch (error) {
            // console.log("Postservice :: createTodo :: Error :",error);
            throw error;
        }
    }

    async updateTodo({title,description},todoId){
        try {
            const updatedTodo=await API.put(`/updatetodo/${todoId}`,{title,description});
            return updatedTodo.data;
        } catch (error) {
            // console.log("Postservice :: updateTodo :: Error :",error);
            throw error;
        }
    }

    async deleteTodo(todoId){
       try {
            const deletedTodo=await API.delete(`/deletetodo/${todoId}`);
            return deletedTodo.data;
        } catch (error) {
            // console.log("Postservice :: deleteTodo :: Error :",error);
            throw error;
        }
    }
    async getAllTodo(){
        try {
            const response=await API.get(`/getalltodo`);
            return response.data;
        } catch (error) {
            // console.log("Postservice :: getAllTodo :: Error :",error);
            throw error;
        }
    }

    async toggleCompleteTodo(todoId){
        try {
            const response=await API.put(`/toggletodo/${todoId}`);
            return response.data;
        } catch (error) {
            // console.log("Postservice :: toggleCompleteTodo :: Error :",error);
            throw error;
        }
    }
}

const postService=new PostService();
export default postService;