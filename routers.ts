import { Router } from 'express'
import { addTodo } from './controllers/index'

// Create a new express app instance
const router: Router = Router()

router.post("/add-todo", addTodo)

export default router