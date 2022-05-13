import TodoEntity from '../../../domain/todo/TodoEntity'
import TodoStore from '../../../stores/TodoStore'
import PaginationOptions from '../utils/pagination/paginationOptions';
import CustomError from '../../../stores/exceptions/customError';


class TodoService {
   //Create TODO
   static addTodo  = async (name:string, price: string, description: string) =>{  
      try {
         if(!name || !price || !description){
            throw new CustomError(400,'Please provide all values to create a Todo')
         }   
        const todoEntity: TodoEntity = TodoEntity.createFromDetails(name,price,description);
        return await TodoStore.add(todoEntity);
      } catch (error: any) {
         throw new CustomError(400, error.message);
      }
   }
   
   //Get All TODO's
   static getAllTodos = async(page:number, perPage:number) => {
      try {
         if(!page || !perPage){
            throw new CustomError(400,'Please provide Page & PerPage values')
         } 

         const pagination = new PaginationOptions(page, perPage);       
         let todos: any = await TodoStore.findAllTodos(pagination);
         return todos
      } catch (error: any) {
         throw new CustomError(400, error.message);
      }
   }
   
   //Get Single TODO
   static getOneTodo  = async (todoId: string) => {      
      try {
         let todo: any = await TodoStore.findByTodoId(todoId);

         if (!todo) {
            throw new CustomError(400, 'Todo not found');
         }
         return todo;
      } catch (error: any) {
         throw new CustomError(400, error.message);
      }
   }
   
   //Update TODO
   static updateTodo = async (todoId: string, name: string, price:string, description:string ) => {
      try {
         const todoUpdateObj = {todoId: todoId, name: name,price: price,descrition: description};
         const todoEntity: any = TodoEntity.createFromObj(todoUpdateObj);
         const todo: any = await TodoStore.update(todoEntity);
         if (!todo[0]) {
            throw new CustomError(400, 'Update Failed');
         }
         return {message:'Successfully updated'};
      
      } catch (error:any) {
         throw new CustomError(400, error.message);
      }
   }

   //Delete TODO
   static  deleteTodo = async (todoId: string) => {
      try {
         let todo: any = await TodoStore.remove(todoId);
         
         if (!todo) {
            throw new CustomError(400, 'Unable to delete, Todo ID does not exist');
         }
         return todo; 
      } catch (error:any) {
         throw new CustomError(400, error.message); 
      }
   }
}
 export default TodoService