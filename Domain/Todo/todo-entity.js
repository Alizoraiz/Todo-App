import * as uuid from 'uuid';
import { Sequelize } from 'sequelize';

class TodoEntity {
    id;
    name;
    price;
    description;

    constructor(id,name, price, description) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.description = description;
    }

    static createFromInput(name, price, description) {
        const id = uuid.v4();
        const todo = new TodoEntity(id, name, price, description);
        return todo;
      }
  }

  module.exports = {
      TodoEntity
} 
  