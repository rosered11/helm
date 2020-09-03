import { Response, Request, json } from "express"
import { ITodo } from '../mymodel'
import Todo from '../mymodel'

// class Controller {
//     async addTodo (req: Request, res: Response): Promise<void> {
//         try {
//             console.log('bbbbbbbbbbbbbb' + req.body);
            
//           const body = req.body as Pick<ITodo, "name">
//           console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa' + body);
          
//           const todo: ITodo = new Todo({
//             name: body.name
//           })
      
//           const newTodo: ITodo = await todo.save()
//           const allTodos: ITodo[] = await Todo.find()
      
//           res
//             .status(201)
//             .json({ message: "Todo added", todo: newTodo, todos: allTodos })
//         } catch (error) {
//           throw error
//         }
//     }
// }

// export default Controller

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<ITodo, "name" >
  
      const todo: ITodo = new Todo({
        name: body.name
      })
  
      const newTodo: ITodo = await todo.save()
      const allTodos: ITodo[] = await Todo.find()
  
      res
        .status(201)
        .json({ message: "Todo added", todo: newTodo, todos: allTodos })
    } catch (error) {
      throw error
    }
  }
  export { addTodo }