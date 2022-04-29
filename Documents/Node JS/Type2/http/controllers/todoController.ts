import TodoEntity from '../../domain/todo/TodoEntity'
import TodoStore from '../../stores/TodoStore'



 //Create TODO

 const addTodo = async (req: any,res: any) => {
   
   const todoEntity: TodoEntity = TodoEntity.createFromDetails(req.body.name,req.body.price,req.body.description);
   const todo: any = await TodoStore.add(todoEntity);
   res.status(200).send(todo);
   
 }

 //Get All TODO's

 const getAllTodo = async (req: any,res: any) =>{  
    let todos: any = await TodoStore.findAllTodos()
    res.status(200).send(todos)
 }

 //Get Single Todo

 const getOneTodo = async (req: any,res: any) =>{
    let id: any = req.params.id
    let todo: any = await TodoStore.findByTodoId(id)

    if(todo)
    res.status(200).send(todo)
    else
    res.status(404).send("Todo not found")
 }

 //Update Todo

 const updateTodo = async (req: any,res: any) =>{
    req.body.todoId = req.params.id;
    const todoEntity: any = TodoEntity.createFromObj(req.body);   
    const todo: any = await TodoStore.update(todoEntity);
    
    if (todo[0] === 1) 
    res.status(200).send("Todo has been updated");
    else
    res.send("Error, Todo not Updated")  
 }

 //Delete Product

 const deleteTodo = async (req: any,res: any) =>{
   req.body.todoId = req.params.id;
   const todoEntity: any = TodoEntity.createFromObj(req.body);

   await TodoStore.remove(todoEntity)
   res.status(200).send("Todo has been deleted")
 }
 
 export default {addTodo, getAllTodo, getOneTodo, updateTodo, deleteTodo}
