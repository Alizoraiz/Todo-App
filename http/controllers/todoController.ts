import TodoService from '../../app/application/todos/todoService';
import handleError from '../utlis/errorHandler';
import logger from '../utlis/loggerService';
import "reflect-metadata";
import myContainer from '../../app/infrastructure/config/inversifyConfig';
import { injectable, inject } from 'inversify';
import TYPES from '../../app/domain/types/types';

//myContainer.get(TodoService)

//Create TODO
@injectable()
class TodoController {
   public todoService: any
   constructor(@inject(TYPES.TodosService) todoService: TodoService) {
      this.todoService = todoService;
    }
 addTodo = async (req: any,res: any) => {
   const {body: {name,price,description}} = req
   console.log('here', name)
   try {
      const response = await this.todoService.addTodo(name,price,description);
      res.status(200).send(response)
   } catch (err: any) {
      logger.error(err.message);
      return handleError(err, res);
   }
}

//Get All TODO's

 getAllTodo = async (req: any,res: any) =>{
   const {query:{page,perPage}} = req
   try {
      const response = await TodoService.getAllTodos(page,perPage);
      res.status(200).send(response);
   } catch (err: any) {
      logger.error(err.message);
      return handleError(err, res);
   }
}

//Get Single Todo

 getOneTodo = async (req: any,res: any) => {
   const {params:{id}} = req;
   try {
      const response = await TodoService.getOneTodo(id);
      res.status(200).send(response);
   
   } catch (err: any) {
      logger.error(err.message);
      return handleError(err, res);
   }
}

//Update Todo

 updateTodo = async (req: any,res: any) =>{
   const {params:{id}} = req
   const {name,price,description} = req.body;
   try {
      const response = await TodoService.updateTodo(id,name,price,description);
      return res.status(200).send(response);
   } catch (err: any) {
      logger.error(err.message);
      return handleError(err, res);
   }
}

//Delete Todo

 deleteTodo = async (req: any,res: any) => {   
   const {params:{id}} = req;
   try {
      const response = await TodoService.deleteTodo(id);
      res.status(200).send(response)
      
   } catch (err: any) {
      logger.error(err.message);
      return handleError(err, res);
   }
}
}

export default TodoController
 