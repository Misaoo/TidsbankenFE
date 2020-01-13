import axios, { AxiosRequestConfig } from "axios";


/*
    This code consolidates a lot of the API requests that the application uses (for the most part)
    Any request that results in the user being logged out if they attempt it and the backend responds with
    401 Unauthorized or 403 Forbidden is wrapped with the function axiosWrapper. All other requests (like login etc.)
    use Axios straight away.
*/


const unauthorizedOrForbidden = (error: any): void => {
    if (error.response.status === 401 || error.response.status === 403) {
        window.location.href = "/logout";
    }
}

const axiosWrapper = (url: string, options: AxiosRequestConfig): any => {
    return axios(url, options).catch(unauthorizedOrForbidden);
}

/*const axiosWrappers = (url: string, options: AxiosRequestConfig, headers: AxiosRequestConfig): any => {
    return axios(url, options).catch(unauthorizedOrForbidden);
}*/

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

const validatePassword = (password: string): any => axios(`${process.env.REACT_APP_API_URL}/validate`, {
    method: "POST",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    },
    data: { password }
});

// Not using the catch all to allow it to return the correct response.
const logout = (): any => axios(`${process.env.REACT_APP_API_URL}/logout`, {
    method: "POST",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});



// Not using the catch all to allow it to return the correct response.
const authorize = (): any => axios(`${process.env.REACT_APP_API_URL}/authorize`, {
    method: "POST",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const user = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "GET",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const allApprovedVacReqs = (): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/allApproved`, {
    method: "GET",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt'),
    }
});


const userPendingVacReqs = (): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/allPending`, {
    method: "GET",
    withCredentials: true, 
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const userDeniedVacReqs = (): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/allDenied`, {
    method: "GET",
    withCredentials: true, 
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

// Not using the catch all to allow it to return the correct response.
const getVacationDays = (): any => axios(process.env.REACT_APP_API_URL + "/setting/maximumVacationDays", {
    method: "GET",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const submitVacationRequest = (dates: string[], type: any): any => axiosWrapper(process.env.REACT_APP_API_URL + "/request", {
    method: "POST",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    },
    data: { dates: dates, type: type }
});

const submitIneligibleDay = (date: string): any => axiosWrapper(process.env.REACT_APP_API_URL + "/ineligible", {
    method: "POST",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    },
    data: { date: date }
});

const getIneligibleDays = (): any => axiosWrapper(process.env.REACT_APP_API_URL + "/ineligible", {
    method: "GET",
    withCredentials: true, 
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const getVacationRequest = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/${id}`, {
    method: "GET",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const getVacationRequestComments = (id: number): any => axios(`${process.env.REACT_APP_API_URL}/request/${id}/comment`, {
    method: "GET",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const postVacationRequestComment = (id: number, comment: string): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/${id}/comment`, {
    method: "POST",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    },
    data: { "comment": comment }
});

const updateUser = (userId: number, email: string): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "PATCH",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    },
    data: { userId, email }
});

const updateUserImage = (userId: number, profilePic: string): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "PATCH",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    },
    data: { userId, profilePic }
});

const updateUserPassword = (userId: number, password: string): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${userId}/update_password`, {
    method: "POST",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    },
    data: { userId, password }
});

const updateUser2fa = (userId: number, twoFacAut: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "PATCH",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    },
    data: { userId, twoFacAut }
});

const vacationsApproved = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/approved/${id}`, {
    method: "GET",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const vacationsDenied = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/denied/${id}`, {
    method: "GET",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const vacationsPending = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/request/pending/${id}`, {
    method: "GET",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const deleteAccount = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "DELETE",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const removeIneligbleDay = (id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/ineligible/${id}`, {
    method: "DELETE",
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});

const removeAccountRequest = (user_Id: number): any => axiosWrapper(`${process.env.REACT_APP_API_URL}/setting/removeaccountreq`, {
    method: 'POST',
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    },
    data: {user_Id}
});

const getUsersByGroup  =(group_Id: number) : any => axiosWrapper(`${process.env.REACT_APP_API_URL}/user/${group_Id}` , {
    method: 'GET',
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('jwt')
    }
});


export default {
    login,
    login2fa,
    validatePassword,
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
    deleteAccount,
    removeIneligbleDay,
    removeAccountRequest,
    getUsersByGroup
};
