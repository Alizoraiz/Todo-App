import "reflect-metadata";


const TYPES = {
  TodoRepository: Symbol.for('TodoRepository'),
  UserRepository: Symbol.for('UserRepository'),
  AuthInfrastructureService: Symbol.for('AuthInfrastructureService'),
  AuthService: Symbol.for('AuthService'),
  TodosService: Symbol.for('TodoService'),
  UsersService: Symbol.for('UserService'),
};
export default TYPES;
