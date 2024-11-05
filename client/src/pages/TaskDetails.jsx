import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function TaskDetails() {
    const {id} = useParams()
    const [task , setTaks] = useState(null)

    const getTask = async()=>{
        const res = await axios.get(`http://localhost:8000/api/task/get/${id}` , {withCredentials : true})
        setTaks(res.data.task)
    }

    useEffect(()=>{
        getTask()
    })
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Task Details</h2>

                    <div className="space-y-3">
                        <div>
                            <span className="font-medium">Title: </span>
                            <span className="text-gray-600">{task?.title}</span>
                        </div>

                        <div>
                            <span className="font-medium">Description: </span>
                            <span className="text-gray-600">{task?.description}</span>
                        </div>

                        <div>
                            <span className="font-medium">Created at: </span>
                            <span className="text-gray-600">{task?.createdAt}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Link to="/"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Close
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}