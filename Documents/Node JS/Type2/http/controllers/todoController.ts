import TodoService from '../../app/services/todos/todoService'
import handleError from '../utlis/errorHandler';
import logger from '../utlis/loggerService'


//Create TODO

const addTodo = async (req: any,res: any) => {
   const {body: {name,price,description}} = req
   try {
      const response = await TodoService.addTodo(name,price,description);
      res.status(200).send(response)
   } catch (err: any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}

//Get All TODO's

const getAllTodo = async (req: any,res: any) =>{
   const {page,perPage} = req.query
   try {
      const response = await TodoService.getAllTodos(page,perPage);
      res.status(200).send(response);
   } catch (err: any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}

//Get Single Todo

const getOneTodo = async (req: any,res: any) => {
   const {id} = req.params;
   try {
      const response = await TodoService.getOneTodo(id);
      res.status(200).send(response);
   
   } catch (err: any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}

//Update Todo

const updateTodo = async (req: any,res: any) =>{
   const {id} = req.params
   const {name,price,description} = req.body;
   try {
      const response = await TodoService.updateTodo(id,name,price,description);
      return res.status(200).send(response);
   } catch (err: any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}

//Delete Todo

const deleteTodo = async (req: any,res: any) => {   
   const {id} = req.params;
   try {
      const response = await TodoService.deleteTodo(id);
      res.status(200).send({message:'Successfully deleted'})
      
   } catch (err: any) {
      logger.warn(err.message);
      return handleError(err, res);
   }
}
 
export default {addTodo, getAllTodo, getOneTodo, updateTodo, deleteTodo}