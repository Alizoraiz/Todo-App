const db = require ('../models')
const TodoEntity = require ('../Domain/Todo/todo-entity')
const TodoService = require ('../App/Todo/todoService')

//Create Main Model
 const Todo = db.todo

 //Main

 //Create TODO

 const addTodo = async (req,res) => {
   //  console.log("Add Todo");
   //  console.log(req.body);
    
   //   let info = {
   //       name: req.body.name,
   //       price: req.body.price,
   //       description: req.body.description
   //   }

   //   const todo = await Todo.create(info)
   //   res.status(200).send(todo)
   const todoEntity = TodoEntity.createFromInput(req.body.name,req.body.price,req.body.description);
   TodoService.addTodo(todoEntity);
   
 }

 //Get All TODO's

 const getAllTodo = async (req,res) =>{

    //Show selected attributes 

    // let todos = await Todo.findAll({
    //     attributes: [
    //         'name',
    //         'price'
    //     ]
    // })
    let todos = await Todo.findAll({})
    res.status(200).send(todos)
 }

 //Get Single Todo

 const getOneTodo = async (req,res) =>{
    let id = req.params.id
    let todo = await Todo.findOne({where : {id:id}})
    if(todo)
    res.status(200).send(todo)
    else
    res.status(404).send("Todo not found")
 }

 //Update Todo

 const updateTodo = async (req,res) =>{
    let id = req.params.id
    const todo = await Todo.update(req.body,{where: {id:id}})
    res.status(200).send({message:"Todo is updated"})
 }

 //Delete Product

 const deleteTodo = async (req,res) =>{
    let id = req.params.id
    await Todo.destroy({ where : { id:id }})
    res.status(200).send("Todo is deleted")
 }

 module.exports = {
     addTodo,
     getAllTodo,
     getOneTodo,
     updateTodo,
     deleteTodo
 }

 
