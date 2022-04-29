import * as uuid from 'uuid';

class UserEntity {
  public userId: string;
  public username: string;
  public password: string;
  public email: string;

  constructor(userId: string, username: string, password: string, email: string) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  static createFromDetails(username: string, password: string, email: string) {
    return new UserEntity(uuid.v4(), username, password, email);
  }

  static createFromObj(obj: any) {
    return new UserEntity(
        obj.userId,
        obj.username,
        obj.password,
        obj.email,
    );
  }
}

export default UserEntity;
  