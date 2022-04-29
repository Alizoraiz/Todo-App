import TodoEntity from '../domain/todo/TodoEntity'
import Sequelize from 'sequelize'
import mysqlConnection from '../config/mysqlConnection';

const TodoModel = mysqlConnection.define("todo",{
    TodoId: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DataTypes.INTEGER
    },
    description: {
        type: Sequelize.DataTypes.STRING
    }
});

class TodoStore {

    static async add(todoEntity: any){
        const todoObj = await TodoModel.create(todoEntity);
        return TodoEntity.createFromObj(todoObj) 
    }

    static async findByTodoId(todoId: string){
        const todo = await TodoModel.findOne({where: { todoId }})
        return TodoEntity.createFromObj(todo);
    }
    
    static async findAllTodos(){
        const todoObjs = await TodoModel.findAll();
        return todoObjs.map((todoObj: any) => TodoEntity.createFromObj(todoObj))
    }

    static async remove(todoEntity: TodoEntity){
        return await TodoModel.destroy({where: {todoId: todoEntity.todoId}})
    }

    static async update(todoEntity: TodoEntity){
        return await TodoModel.update(todoEntity, {where: {todoId: todoEntity.todoId}})
    }
      
}
export default TodoStore



