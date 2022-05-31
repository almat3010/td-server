import express, {Router} from 'express'
import TaskRequest from "../requests/taskRequest";
import checkAT from "../middleware/checkAT";

const router: Router = express.Router()
router.get('/',checkAT, TaskRequest.getTask)
router.post('/',checkAT, TaskRequest.addTask)
router.put('/',checkAT, TaskRequest.updateTask)
router.delete('/',checkAT, TaskRequest.delTasks)

export default router