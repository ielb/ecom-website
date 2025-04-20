import axios from 'axios'

const API_URL = 'http://localhost:3030/v1'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth-storage')
    if (token) {
        const parsedToken = JSON.parse(token).state.token
        config.headers.Authorization = `Bearer ${parsedToken}`
    }
    return config
})

export default api 