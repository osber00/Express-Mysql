const {DataTypes, Model} = require('sequelize')
const sequelize = require('../config/conexion_db')
const bcrypt = require('bcryptjs')

class Usuario extends Model{}

Usuario.init(
    {
        id:{
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: bcrypt.hashSync('123456')
        },
        identificacion:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telefono:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        tipo:{
            type: DataTypes.STRING,
            defaultValue: '4'
        },
        programa_id:{
            type: DataTypes.BIGINT,
            allowNull: true,
        }
    },
    {
        sequelize,
        createdAt : 'created_at',
        updatedAt : 'updated_at',
        modelName: 'Usuario',
        tableName: 'users'
    }
)

module.exports = Usuario