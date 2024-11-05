import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["TODO", "INPROGRESS", "DONE"],
        default: "TODO",
        required: true,
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required :true
    }

}, { timestamps: true })

export const Task = mongoose.model("Task", taskSchema)