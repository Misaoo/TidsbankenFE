import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

const unauthorizedOrForbidden = (error: any):void => {
    if (error.response.status === 401 || error.response.status === 403) {
        window.location.href = "/logout";
    }
}

const axiosWrapper = (url: string, options: AxiosRequestConfig): any => {
    return axios(url, options).catch(unauthorizedOrForbidden);
}

// Not using the catch all to allow it to return the correct response.
const login = (email: string, password: string): any => axios(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    withCredentials: true,
    data: { email, password }
});

// Not using the catch all to allow it to return the correct response.
const login2fa = (token: string): any => axios(`${process.env.REACT_APP_API_URL}/login2fa`, {
    method: "POST",
    withCredentials: true,
    data: { password2fa: token }
});

// Not using the catch all to allow it to return the correct response.
const logout = (): any => axios(`${process.env.REACT_APP_API_URL}/logout`, {
    method: "POST",
    withCredentials: true
});

// Not using the catch all to allow it to return the correct response.
const authorize = (): any => axios(`${process.env.REACT_APP_API_URL}/authorize`, {
    method: "POST",
    withCredentials: true
});

const user = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "GET",
    withCredentials: true
});

const allApprovedVacReqs = (): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/allApproved`, {
    method: "GET",
    withCredentials: true
});


const userPendingVacReqs = (): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/allPending`, {
    method: "GET",
    withCredentials: true
});


const userDeniedVacReqs = (): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/allDenied`, {
    method: "GET",
    withCredentials: true
});

// Not using the catch all to allow it to return the correct response.
const getVacationDays = (): any => axios(process.env.REACT_APP_API_URL + "/setting/maximumVacationDays", {
    method: "GET",
    withCredentials: true
});

const submitVacationRequest = (dates: string[]): any => axiosWrapper(process.env.REACT_APP_API_URL + "/request", {
    method: "POST",
    withCredentials: true,
    data: { dates: dates }
});

const submitIneligibleDay = (date: string): any => axiosWrapper(process.env.REACT_APP_API_URL + "/ineligible", {
    method: "POST",
    withCredentials: true,
    data: { date: date }
});

const getIneligibleDays = (): any => axiosWrapper(process.env.REACT_APP_API_URL + "/ineligible", {
    method: "GET",
    withCredentials: true
});

const getVacationRequest = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/${id}`, {
    method: "GET",
    withCredentials: true
});

const getVacationRequestComments = (id: number): any => axios(`${process.env.REACT_APP_API_URL}/request/${id}/comment`, {
    method: "GET",
    withCredentials: true
});

const postVacationRequestComment = (id: number, comment: string): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/${id}/comment`, {
    method: "POST",
    withCredentials: true,
    data: { "comment": comment }
});
const updateUser = (id: number, userId: number, email: string): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "PATCH",
    withCredentials: true,
    data: { userId, email }
});

const updateUserImage = (id: number, userId: number, profilePic: string): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "PATCH",
    withCredentials: true,
    data: { userId, profilePic }
});

const updateUserPassword = (id: number, userId: number, password: string): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${id}/update_password`, {
    method: "POST",
    withCredentials: true,
    data: { userId, password }
});

const updateUser2fa = (id: number, userId: number, twoFacAut: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "PATCH",
    withCredentials: true,
    data: { userId, twoFacAut }
});

const vacationsApproved = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/approved/${id}`, {
    method: "GET",
    withCredentials: true,
});

const vacationsDenied = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/denied/${id}`, {
    method: "GET",
    withCredentials: true,
});

const vacationsPending = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/pending/${id}`, {
    method: "GET",
    withCredentials: true,
});

const deleteAccount = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${id}`, {
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
