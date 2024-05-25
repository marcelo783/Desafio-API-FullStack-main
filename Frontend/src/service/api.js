import axios from 'axios';
import authToken from '../cookies/appCookies';
const token = document.cookie.split(`${authToken}=`)[1]
const myheaders = {
    'Content-Type': 'application/json',
}

if (token) {
    myheaders['Authorization'] = token
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: myheaders
});

export default api;