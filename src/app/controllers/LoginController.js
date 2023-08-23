const Usuario = require('../models/UsuarioModel')
const bcrypt = require('bcryptjs')
const moment = require('moment')
const jwt = require('jwt-simple')
require('dotenv').config()

exports.postLogin = async (req, res)=>{
    const usuario = await Usuario.findOne({
        where:{
            email: req.body.email
        }
    })

    if (usuario) {
         const comprobarPassword = bcrypt.compareSync(req.body.password, usuario.password)
         if (comprobarPassword) {
            res.json({
                ok: true,
                status: 200,
                data: generarToken(usuario)
            })
         }else{
            res.json({
                ok: false,
                status: 200,
                data: 'Usuario y/o contraseña no válidos'
            })
         }
    } else {
        res.json({
            ok: false,
            status: 200,
            data: 'Usuario no registrado'
        })
    }
}

const generarToken = (usuario)=>{
    const payload = {
        usuario_id: usuario.id,
        created_at: moment().unix(),
        expired_at: moment().add(5, 'minutes').unix()
    }

    return jwt.encode(payload,process.env.FRASE_TOKEN)
}