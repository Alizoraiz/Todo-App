import { Container } from 'inversify';
import "reflect-metadata";

//import AuthTokenService from '../../../';
import TYPES from '../../domain/types/types';

const myContainer = new Container();

myContainer.bind(TYPES.TodoRepository).toSelf();
myContainer.bind(TYPES.UserRepository).toSelf();
myContainer.bind(TYPES.AuthService).toSelf();
myContainer.bind(TYPES.UsersService).toSelf();
myContainer.bind(TYPES.TodosService).toSelf();
export default myContainer;