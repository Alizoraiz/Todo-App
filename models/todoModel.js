const { Sequelize } = require(".");
const uuidv4 = require ('uuid')
module.exports = (sequelize,DataTypes) => {

    const Todo = sequelize.define("todo",{
        id: {
            // type: DataTypes.INTEGER,
            // autoIncrement: true,
            // primaryKey: true
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        }
    })

    return Todo;
}