import TodoEntity from '../../domain/todo/TodoEntity'
import PaginationOptions from '../../services/utils/pagination/paginationOptions';
import TodoRepositry from '../../infrastructure/mysqlrepositories/repositries/TodoRepositry';
import logger from '../../../http/utlis/loggerService'
import AddTodoException from '../../infrastructure/exceptions/todos/addTodoException';
import AllTodoException from '../../infrastructure/exceptions/todos/allTodoException';
import SingleTodoException from '../../infrastructure/exceptions/todos/singleTodoException';
import UpdateTodoException from '../../infrastructure/exceptions/todos/updateTodoException';
import DeleteTodoException from '../../infrastructure/exceptions/todos/deleteTodoException';
import { injectable, inject } from 'inversify';
import TYPES from '../../domain/types/types';
import "reflect-metadata";

@injectable()
class TodoService {
   public todoRepository
   constructor(@inject(TYPES.TodoRepository) todoRepository: TodoRepositry) {
      this.todoRepository = todoRepository;
    }
   //Create TODO
   addTodo  = async (name:string, price: string, description: string) =>{  
      try {
         if(!name || !price || !description){
            throw new AddTodoException(400,'Please provide all values to create a Todo')
         }   
        const todoEntity: TodoEntity = TodoEntity.createFromDetails(name,price,description);
        return await this.todoRepository.add(todoEntity);
      } catch (error: any) {
         logger.error(error.message);
         throw new AddTodoException(400, error.message);
      }
   }
   
   //Get All TODO's
   static getAllTodos = async(page:number, perPage:number) => {
      try {
         if(!page || !perPage){
            throw new AllTodoException(400,'Please provide Page & PerPage values')
         } 

         const pagination = new PaginationOptions(page, perPage);       
         let todos: any = await TodoRepositry.findAllTodos(pagination);
         return todos
      } catch (error: any) {
         logger.error(error.message);
         throw new AllTodoException(400, error.message);
      }
   }
   
   //Get Single TODO
   static getOneTodo  = async (todoId: string) => {      
      try {
         let todo: any = await TodoRepositry.findByTodoId(todoId);

         if (!todo) {
            throw new SingleTodoException(400, 'Todo not found');
         }
         return todo;
      } catch (error: any) {
         logger.error(error.message);
         throw new SingleTodoException(400, error.message);
      }
   }
   
   //Update TODO
   static updateTodo = async (todoId: string, name: string, price:string, description:string ) => {
      try {
         const todoUpdateObj = {todoId: todoId, name: name,price: price,descrition: description};
         const todoEntity: any = TodoEntity.createFromObj(todoUpdateObj);
         const todo: any = await TodoRepositry.update(todoEntity);
         if (!todo[0]) {
            throw new UpdateTodoException(400, 'Update Failed');
         }
         return {message:'Successfully updated'};
      
      } catch (error:any) {
         logger.error(error.message);
         throw new UpdateTodoException(400, error.message);
      }
   }

   //Delete TODO
   static  deleteTodo = async (todoId: string) => {
      try {
         let todo: any = await TodoRepositry.remove(todoId);
         
         if (!todo) {
            throw new DeleteTodoException(400, 'Unable to delete, Todo ID does not exist');
         }
         return {message:'Successfully deleted'}; 
      } catch (error:any) {
         logger.error(error.message);
         throw new DeleteTodoException(400, error.message); 
      }
   }
}
 export default TodoService