import axios from "axios"

const endpoint = import.meta.env.VITE_API_ENDPOINT

const register = async ({ name, email, password }) => {
    try {
        const res = await axios.post(`${endpoint}/register`, {
            name, email, password
        }, { withCredentials: true })
        console.log(res.data.createdUser)
        return res
    } catch (error) {
        console.log("error while registering: ", error)
        return null
    }
}

const login = async ({ email, password }) => {
    try {
        const res = await axios.post(`${endpoint}/login`, { email, password }, { withCredentials: true })
        console.log(res)
        return res.data
    } catch (error) {
        console.log("error while Login: ", error)
    }
}

const logoutUser = async () => {
    try {
        const res = await axios.get(`${endpoint}/logout`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log("error while Logout: ", error)
        return null
    }
}



export { register, login, logoutUser }