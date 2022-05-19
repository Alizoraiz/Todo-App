"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { faker } = require('@faker-js/faker');
class FakerUser {
    static userId() {
        return this.randomUUID = faker.datatype.uuid();
    }
    static userName() {
        return this.randomUserName = faker.internet.userName();
    }
    static password() {
        return this.randomPassword = faker.internet.password();
    }
    static email() {
        return this.randomEmail = faker.internet.email();
    }
}
exports.default = FakerUser;
