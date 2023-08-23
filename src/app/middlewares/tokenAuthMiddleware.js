const moment = require('moment')
const jwt = require('jwt-simple')
require('dotenv').config()

exports.autorizacionToken = (req, res, next)=>{

    /* Existe el token */
    if (!req.headers['token-usuario']) {
        return res.status(422).json({
            ok: false,
            status: 422,
            data: 'No hay token asociado en la petición'
        })
    }

    /* Obtener info del token */
    const token = req.headers['token-usuario']
    let payload = {}

    /* Decodificar */
    try {
        payload = jwt.decode(token, process.env.FRASE_TOKEN)
    } catch (error) {
        return res.json({
            ok: false,
            status: 422,
            data: 'No se pudo obtener token'
        })
    }

    /* Validar vigencia */
    if (payload.expired_at < moment.unix()) {
        return res.json({
            ok: false,
            status: 422,
            data: 'El token ha vencido'
        })
    }

    /* Agregar en la peticion el ID del usuario autorizado */
    req.usuarioid = payload.usuario_id

    next()
}