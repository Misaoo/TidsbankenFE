import axios from "axios";

const login = (email: string, password: string) =>
  axios(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    withCredentials: true,
    data: { email, password }
  });

const login2fa = (token: string) =>
  axios(`${process.env.REACT_APP_API_URL}/login2fa`, {
    method: "POST",
    withCredentials: true,
    data: { password2fa: token }
  });

const logout = () =>
  axios(`${process.env.REACT_APP_API_URL}/logout`, {
    method: "POST",
    withCredentials: true
  });

const authorize = () =>
  axios(`${process.env.REACT_APP_API_URL}/authorize`, {
    method: "POST",
    withCredentials: true
  });

const user = (id: number) =>
  axios(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "GET",
    withCredentials: true
});

const allApprovedVacReqs = () => axios(`${process.env.REACT_APP_API_URL}/request/allApproved`, {
    method: "GET",
    withCredentials: true
});


const userPendingVacReqs = () => axios(`${process.env.REACT_APP_API_URL}/request/allPending`, {
    method: "GET",
    withCredentials: true
});


const userDeniedVacReqs = () => axios(`${process.env.REACT_APP_API_URL}/request/allDenied`, {
    method: "GET",
    withCredentials: true
});

const getVacationDays = () => axios(process.env.REACT_APP_API_URL + "/setting/maximumVacationDays", {
    method: "GET",
    withCredentials: true
});

const submitVacationRequest = (dates: string[]) => axios(process.env.REACT_APP_API_URL + "/request", {
    method: "POST",
    withCredentials: true,
    data: {dates: dates}
});

const submitIneligibleDay = (date: string) => axios(process.env.REACT_APP_API_URL + "/ineligible", {
    method: "POST",
    withCredentials: true,
    data: {date: date}
});

const getIneligibleDays = () => axios(process.env.REACT_APP_API_URL + "/ineligible", {
    method: "GET",
    withCredentials: true
});

const getVacationRequest = (id:number) => axios(`${process.env.REACT_APP_API_URL}/request/${id}`, {
    method: "GET",
    withCredentials: true
});

const getVacationRequestComments = (id: number) => axios(`${process.env.REACT_APP_API_URL}/request/${id}/comment`, {
    method: "GET",
    withCredentials: true
});

const postVacationRequestComment = (id: number, comment: string) => axios(`${process.env.REACT_APP_API_URL}/request/${id}/comment`, {
    method: "POST", 
    withCredentials: true, 
    data: { "comment": comment }
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

const updateUser2fa = (id:number, userId: number, twoFacAut:number) => axios(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "PATCH",
    withCredentials: true,
    data: {userId,twoFacAut}
});

const vacationsApproved = (id:number) => axios(`${process.env.REACT_APP_API_URL}/request/approved/${id}`, {
    method: "GET",
    withCredentials: true,
});

const vacationsDenied = (id:number) => axios(`${process.env.REACT_APP_API_URL}/request/denied/${id}`, {
    method: "GET",
    withCredentials: true,
});

const vacationsPending = (id:number) => axios(`${process.env.REACT_APP_API_URL}/request/pending/${id}`, {
    method: "GET",
    withCredentials: true,
});

const deleteAccount = (id:number) => axios(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "DELETE",
    withCredentials: true,
});


export default { 
    login, 
    login2fa, 
    logout, 
    authorize,
    user,
    allApprovedVacReqs,
    userPendingVacReqs,
    userDeniedVacReqs,
    getVacationDays,
    submitVacationRequest,
    submitIneligibleDay,
    getIneligibleDays,
    getVacationRequest,
    getVacationRequestComments,
    postVacationRequestComment,
    updateUser,
    updateUserImage,
    updateUserPassword,
    updateUser2fa,
    vacationsApproved,
    vacationsDenied,
    vacationsPending,
    deleteAccount
};
