import axios from 'axios';

const login = (email: string, password: string) => axios(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST", 
    withCredentials: true, 
    data: { email, password }
});

const login2fa = (token: string) => axios(`${process.env.REACT_APP_API_URL}/login2fa`, {
    method: "POST", 
    withCredentials: true, 
    data: { "password2fa": token }
});

const logout = () =>  axios(`${process.env.REACT_APP_API_URL}/logout`, {
    method: "POST", 
    withCredentials: true
});

const authorize = () => axios(`${process.env.REACT_APP_API_URL}/authorize`, {
    method: "POST",
    withCredentials: true
});

const user = (id: number) => axios(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "GET",
    withCredentials: true
});

const updateUser = (id:number, userId: number, email:string) => axios(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "PATCH",
    withCredentials: true,
    data: {userId,email}
});

const updateUserImage = (id:number, userId: number, profilePic:string) => axios(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "PATCH",
    withCredentials: true,
    data: {userId,profilePic}
});

const updateUserPassword = (id:number, userId: number, password:string) => axios(`${process.env.REACT_APP_API_URL}/user/${id}/update_password`, {
    method: "POST",
    withCredentials: true,
    data: {userId,password}
});


export default { 
    login, 
    login2fa, 
    logout, 
    authorize,
    user,
    updateUser,
    updateUserImage,
    updateUserPassword
};