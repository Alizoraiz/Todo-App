import TodoEntity from '../domain/todo/TodoEntity'
import Sequelize from 'sequelize'
import mysqlConnection from '../config/mysqlConnection';
import PaginationOptions from '../app/services/utils/pagination/paginationOptions';
import PaginatedCollection from '../app/services/utils/pagination/paginationCollection';
import logger from "../http/utlis/loggerService"
import CustomError from './exceptions/customError';

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
        try {
            const todoObj = await TodoModel.create(todoEntity);
            return TodoEntity.createFromObj(todoObj) 
        } catch (error:any) {
            logger.warn(error.message);
            throw new CustomError(400, error.message);
        }
    }
    
    static async findByTodoId(TodoId: string){
        try {
            const todo = await TodoModel.findOne({where: { TodoId }, raw:true})
            if (!todo) {
                throw new CustomError(400, 'Todo not found,Todo ID unavailable ');
            } else {
                return TodoEntity.createFromObj(todo)
            }
        } catch (error: any) {
            logger.warn(error.message);
            throw new CustomError(400, error.message);        }
    }

    static async findAllTodos(pagination: PaginationOptions){
        try{
            const todoObjs = await TodoModel.findAndCountAll({
                limit: pagination.limit(),
                offset: pagination.offset()   
            });
            
            const todosCollection = todoObjs.rows.map((todoObj: any) => TodoEntity.createFromObj(todoObj))
            const paginatedCollection = new PaginatedCollection(pagination, todoObjs.count, todosCollection)
            return paginatedCollection.getPaginatedData()

        } catch (error: any) {
            logger.warn(error.message);
            throw new CustomError(400, error.message);
        }
    }

    static async remove(todoId: string){
        try {
            return await TodoModel.destroy({where: {TodoId: todoId}})
        } catch (error: any) {
            logger.warn(error.message);
            throw new CustomError(400, error.message);
        }
    }

    static async update(todoEntity: TodoEntity){   
        try {
            return await TodoModel.update(todoEntity, {where: {TodoId: todoEntity.todoId}})
        } catch (error: any) {
            logger.warn(error.message);
            throw new CustomError(400, error.message);
        }
    }
      
}
export default TodoStore