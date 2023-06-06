import express from "express"
import { getUser, Register, Login } from "../controller/Users.js"
const router = express.Router()

router.get ('/users', getUser)
router.post ('/users', Register)
router.post ('/login', Login)

export default router
