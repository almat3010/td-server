import express, {Router} from 'express'
import AuthRequest from "../requests/authRequest";

const router: Router = express.Router()
router.post('/signUp', AuthRequest.registration)
router.post('/signIn', AuthRequest.authorization)

export default router