const { faker } = require('@faker-js/faker');

class FakerUser {
    public static randomUUID: string
    public static randomUserName: string | undefined
    public static randomPassword: string | undefined
    public static randomEmail:string | undefined
    
    static userId(){
        return this.randomUUID = faker.datatype.uuid();
    }
    static userName(){
        return this.randomUserName = faker.internet.userName();
    }
    static password(){
        return this.randomPassword = faker.internet.password();
    }
    static email(){
        return this.randomEmail = faker.internet.email();
    }
}
export default FakerUser