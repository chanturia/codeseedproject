import {Response, Request} from 'express'
import {PlayerI} from '../../types/player'
import PlayerModel from '../../models/player'

const getPlayers = async (req: Request, res: Response): Promise<void> => {
    try {
        const players: PlayerI[] = await PlayerModel.find()
        res.status(200).json({players})
    } catch (error) {
        throw error
    }
}

const createPlayer = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body
        const player: PlayerI = new PlayerModel({
            name: body.name,
            surname: body.surname,
            position: body.position,
            rating: body.rating,
            nationality: body.nationality,
            height: body.height,
            weight: body.weight,
            club: body.club,
            tShirtNumber: body.tShirtNumber,
            dateOfBirth: body.dateOfBirth,
            imageUrl: body.imageUrl,
        })
        console.log(player)
        await player.save()
        const Players: PlayerI[] = await PlayerModel.find()

        res.status(201).json({message: 'Player Created', Players})
    } catch (error) {
        throw error
    }
}

const updatePlayer = async (req: Request, res: Response): Promise<void> => {
}

const deletePlayer = async (req: Request, res: Response): Promise<void> => {
}

export {getPlayers, createPlayer, updatePlayer, deletePlayer}
