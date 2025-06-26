import axios from "axios";
// const baseUrl='https://todo-backend-3t7g.onrender.com/api/v1/user'
// const baseUrl=`${import.meta.env.VITE_BACKEND_URL}/api/v1/user`;
// const baseUrl=`/api/v1/user`
const API=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL +`/api/v1/user`,
    withCredentials:true,
})

class Authservice{
    //! User Register
    async createUser({username,email,password,phone,avatar}){
        // console.log("data from create user: ",username,email,password,phone,avatar);
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("avatar", avatar);
        try {
            const userRegister=await API.post(`/register`,formData)

            if(userRegister){
                return this.userLogin({email,password});
            }else{
                return userRegister.data;
            }
        } catch (error) {
            // console.log("Authservice :: createUser :: Error :",error);
            throw error;
        }
    }

    //! User LogIn
    async userLogin({email,password}){
        try {
            const loggedinUser=await API.post(`/login`,{
                email,
                password
            })
            return loggedinUser.data;
        } catch (error) {
            // console.log("Authservice :: userLogin :: Error :",error);
            throw error;
        }
    }

    //! User LogOut
    async userLogOut(){
        try {
            const logoutuser=await API.delete(`/logout`);
            return logoutuser.data;
        } catch (error) {
            //  console.log("Authservice :: userLogOut :: Error :",error);
            throw error;
        }
    }

    //! get current user
    async getcurrentUser(){
        try {
            const getUser=await API.get(`/getcurrentuser`);
            if(getUser){
                return getUser.data;
            }else{
                return null;
            }
        } catch (error) {
            // console.log("Authservice :: getCurrentUser :: Error :",error);
            throw error;
        }
    }

    //! change Password
    async changePassword(data){
        try {
            const response=await API.put(`/changepassword`,{
               oldPassword:data?.oldPassword,
               newPassword:data?.newPassword
            }
            )
            return response.data;
        } catch (error) {
            // console.log("Authservice :: changePassword :: Error :",error);
            throw error;
        }
    }

    //! updateUserDetails
    async updateUserDetails({username,email,avatar}){
        try {
            const formData=new FormData();
            formData.append('username',username);
            formData.append('email',email);
            if(avatar){
                formData.append('avatar',avatar);
            }
            const updatedUser=await API.put(`/updateuserdetailes`,formData)
            return updatedUser.data;
        } catch (error) {
            // console.log("Authservice :: updateUserDetails :: Error :",error);
            throw error;
        }
    }
}

const authService=new Authservice();
export default authService;