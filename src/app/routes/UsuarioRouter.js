const router = require('express').Router()
const {check} = require('express-validator')

const usuarioController = require('../controllers/UsuarioController')

const validacionesCreate = [
    check('name','El campo nombre es requerido').not().isEmpty(),
    check('email','El campo email es requerido').isEmail(),
    check('identificacion','El campo identificacion es requerido').not().isEmpty()
]

router.get('/', usuarioController.getUsuarios)
router.get('/:id', usuarioController.getUsuarioId)
router.get('/identificacion/:identificacion', usuarioController.getUsuarioIdentificacion)
router.get('/nombre/:nombre', usuarioController.getUsuarioNombre)
router.post('/', validacionesCreate,usuarioController.postUsuario)
router.put('/:id', usuarioController.updateUsuario)
router.delete('/:id', usuarioController.deleteUsuario)

module.exports = router