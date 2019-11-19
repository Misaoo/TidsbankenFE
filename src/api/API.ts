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


export default { 
    login, 
    login2fa, 
    logout, 
    authorize,
    user 
};