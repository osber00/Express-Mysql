const bcrypt = require('bcryptjs')
const {Op} = require('sequelize') 
const {validationResult} = require('express-validator')

const Usuario = require('../models/UsuarioModel')


/* Lista de usuarios */
exports.getUsuarios = async (req, res)=>{
    const usuarios = await Usuario.findAll()
    res.status(200).json({
        user: req.usuarioid,
        ok: true,
        status: 200,
        data: usuarios
    })
}

/* Usuario x Id */
exports.getUsuarioId = async (req,res)=>{
    const id = req.params.id
    const usuario = await Usuario.findByPk(id)
    res.status(200).json({
        ok: true,
        status: 200,
        data: usuario
    })
}

/* Usuario x número de identificacion */
exports.getUsuarioIdentificacion = async(req, res)=>{
    const identificacion = req.params.identificacion
    const usuario = await Usuario.findOne({
        where:{
            identificacion: identificacion
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        data: usuario
    })
}

/* Usuario por nombre */
exports.getUsuarioNombre = async (req, res)=>{
    const busqueda = req.params.nombre
    const resultados = await Usuario.findAll({
        where:{
            name:{
                [Op.like]: `%${busqueda}%`
            }
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        data: resultados
    })
}

/* Registrar nuevo Usuario */
exports.postUsuario = async (req, res)=>{
    //console.log(req.body)
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
        return res.status(422).json({
            ok: false,
            status: 422,
            data: errores.array(),
            mje: 'Error de validacion'
        })
    }

    const newUsuario = await Usuario.create({
        name: req.body.name,
        email: req.body.email,
        identificacion: req.body.identificacion,
        programa_id: req.body.programa_id,
        password: bcrypt.hashSync(req.body.identificacion),
        tipo: req.body.tipo
    })
    res.status(201).json({
        ok: true,
        status:201,
        data: newUsuario
    })
}

/* Actualizar información de Usuario */
exports.updateUsuario = async(req, res)=>{
    const id = req.params.id
    //ñr7console.log(req.body)
    const usuario = await Usuario.update(
        {
            name: req.body.name,
            email: req.body.email,
            identificacion: req.body.identificacion,
            telefono: req.body.telefono,
            programa_id: req.body.programa_id
        },
        {
            where:{
                id: id
            }
        }
    )

    res.status(201).json({
        ok: true,
        status:201,
        data: usuario
    })
}

/* Eliminar Usuario */
exports.deleteUsuario = async (req, res)=>{
    const id = req.params.id
    const usuario = Usuario.destroy({
        where:{
            id: id
        }
    })
    res.status(200).json({
        ok: true,
        status: 201,
        data: usuario
    })
}