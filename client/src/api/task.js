import axios from "axios"

const endpoint = import.meta.env.VITE_API_ENDPOINT

const getAllTasks = async () => {
    try {
        const res = await axios.get(`${endpoint}/task/all`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log("error while getting tasks ", error)
        return null
    }
}

const deleteTask = async (id) => {
    try {
        const res = await axios.delete(`${endpoint}/task/delete/${id}`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log("error while deleting tasks ", error)
        return null
    }
}

const addTask = async ({ title, description }) => {
    try {
        const res = await axios.post(`${endpoint}/task/add`, {
            title, description
        }, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log("error while adding tasks ", error)
        return null
    }
}

const getSingleTask = async (id) => {
    try {
        const res = await axios.get(`${endpoint}/task/get/${id}`, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.log("error while getting task ", error)
        return null
    }
}

const editTask = async ({ id, title, description }) => {
    try {
        const res = await axios.put(`${endpoint}/task/edit`, {
            id,
            title,
            description
        }, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log("error while editing task ", error)
        return null
    }
}

const changeTaskStatus = async({id , status})=>{
    try {
        const res = await axios.put(`${endpoint}/task/change-status` , {id,status},{
            withCredentials : true
        })
        return res.data
    } catch (error) {
        console.log("error while changing task status ", error)
        return null
    }
}

export { getAllTasks, deleteTask, addTask, getSingleTask, editTask,changeTaskStatus  }