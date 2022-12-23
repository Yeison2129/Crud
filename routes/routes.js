import {Router} from 'express'
import {login, registro,eliminar_u,consultar_t,consultar_u} from '../controllers/usuarios.js'

const router = Router()

router.post('/register',registro)
router.post('/login',login)
router.post('/eliminar',eliminar_u)
router.get('/consultar',consultar_t)
router.get('/consultar1',consultar_u)




export default router