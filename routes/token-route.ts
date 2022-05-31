import express, {Router} from 'express'
import tokenRequest from "../requests/tokenRequest";

const router: Router = express.Router()
router.post('/', tokenRequest.upd)

export default router