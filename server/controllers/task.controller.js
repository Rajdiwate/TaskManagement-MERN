import { Task } from "../models/task.model.js"
import { ApiError } from "../utils/apiError.js"

//protected route
const getUserTasks = async(req,res,next)=>{
    try {
        const tasks = await Task.find({user : req.user._id})
        return res.status(200).json({success : true , tasks})
    } catch (error) {
        return next(new ApiError ("error while getting Tasks" , 500))
    }

}

//protectred route
const addTask = async(req,res,next)=>{
    try {
        const {title , description  } = req.body
        if(!title || !description) return next(new ApiError("title and description required" , 400))
        
        const task = await Task.create({title , description , user : req.user._id});
        if(!task) return next(new ApiError("Error wehile creating tast" , 400))

        return res.status(200).json({success :true , task})
        
    } catch (error) {
        return next(new ApiError ("error while adding Task" , 500))
    }
}

const deleteTask  = async(req,res,next)=>{
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId)
        if (!deletedTask) {
            return next(new ApiError("Task not found", 404));
        }
        return res.status(200).json({success : true , message : "Task deleted successfully"})
    } catch (error) {
        return next(new ApiError ("error while deleting Task" , 500))
    }
}

const editTask = async(req,res,next)=>{
    try {
        const {id , title ,description} = req.body
        if(!id || !title || !description) return next(new ApiError("incomplete details" , 400))
        
        const task = await Task.findByIdAndUpdate(id , {
            $set :{
                title,
                description
            }
            
        },{new : true})
        if(!task) return next(new ApiError("error while editing" , 500))

        return res.status(200).json({success : true , task})
    } catch (error) {
        return next(new ApiError ("error while editing Task" , 500))
    }
}

const changeTaskStatus = async(req,res,next)=>{
    try {
        const {id , status} = req.body;
        const task = await Task.findByIdAndUpdate(id , {
            $set : {
                status
            }
        } , {new:true})
        if(!task) return next(new ApiError("task not updated" , 500))
        return res.status(200).json({success : true , task} )

    } catch (error) {
        return next(new ApiError("error while changing status" , 500))
    }
}

const getTask = async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id)
        if(!task) return next(new ApiError("No such task found" , 404));

        return res.status(200).json({success:true , task})

    } catch (error) {
        return next(new ApiError("error while getting task" , 500))
    }
}

export {getUserTasks ,addTask , deleteTask , editTask ,changeTaskStatus , getTask}