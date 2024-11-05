import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addTask, changeTaskStatus, deleteTask, editTask, getTask, getUserTasks } from "../controllers/task.controller.js";

const router = Router();

router.route('/task/all').get(verifyJWT , getUserTasks)
router.route('/task/add').post(verifyJWT , addTask)
router.route('/task/delete/:id').delete(verifyJWT , deleteTask)
router.route('/task/edit').put(verifyJWT , editTask)
router.route('/task/change-status').put(verifyJWT , changeTaskStatus)
router.route('/task/get/:id').get(verifyJWT , getTask)

export default router