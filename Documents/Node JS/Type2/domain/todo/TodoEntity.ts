import * as uuid from 'uuid';

class TodoEntity {
  public todoId?: string;
  public name?: string;
  public price?: string;
  public description?: string;

  constructor(todoId: string, name: string, price: string, description: string) {
    this.todoId = todoId;
    this.name = name;
    this.price = price;
    this.description = description;
  }

  static createFromDetails(name: string, price: string, description: string) {
    return new TodoEntity(uuid.v4(), name, price, description);
  }

  static createFromObj(obj: any) {
    return new TodoEntity(
      obj.todoId,
      obj.name,
      obj.price,
      obj.description,
    );
  }
}

export default TodoEntity;
  