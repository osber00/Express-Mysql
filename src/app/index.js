const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const conexion_db = require('./config/conexion_db')
require('dotenv').config()

const tokenAuthMiddleware = require('./middlewares/tokenAuthMiddleware')
const usuarioRouter = require('./routes/UsuarioRouter')
const loginRouter = require('./routes/LoginRouter')

const app = express()
app.set('port', process.env.PORT || 3001)

app.use(morgan('dev'))
app.get('/',(req, res)=>{
    res.send('Express Inicio')
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/usuarios', tokenAuthMiddleware.autorizacionToken, usuarioRouter)
app.use('/login', loginRouter)

const testConexionDB = async()=>{
    try {
        await conexion_db.authenticate()
        console.log('Conexión establecida con la DB')
    } catch (error) {
        console.log(error)
    }
}

//testConexionDB()


module.exports = app