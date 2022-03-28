import {Router} from 'express'
import {getPlayers, createPlayer, updatePlayer, deletePlayer} from '../controllers/players'

const router: Router = Router()

router.get('/get-players', getPlayers)
router.post('/create-player', createPlayer)
router.put('/update-player/:id', updatePlayer)
router.delete('/delete-player/:id', deletePlayer)

export default router
