import { Router } from 'express'
import { User } from '../models/User'



const router = Router()

router.get('/', (req, res) => {
    res.send("Prueba")
})

export default router
