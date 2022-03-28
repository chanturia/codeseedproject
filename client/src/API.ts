import axios, {AxiosResponse} from 'axios'

const baseUrl: string = 'http://localhost:4000'

export const getPlayers = async () => {
    try {
        const Players = await axios.get(
            baseUrl + '/get-players'
        )
        return Players
    } catch (error) {
        // @ts-ignore
        throw new Error(error)
    }
}

export const createPlayer = async (formData: PlayerI) => {
    try {
        const player: PlayerI = {
            name: formData.name,
            surname: formData.surname,
            position: formData.position,
            nationality: formData.nationality,
            rating: formData.rating,
            height: formData.height,
            weight: formData.weight,
            club: formData.club,
            tShirtNumber: formData.tShirtNumber,
            dateOfBirth: formData.dateOfBirth,
            imageUrl: formData.imageUrl,
        }
        const createPlayer: AxiosResponse = await axios.post(
            baseUrl + '/create-player',
            player
        )
        return createPlayer
    } catch (error) {
        // @ts-ignore
        throw new Error(error)
    }
}

export const updatePlayer = async (formData: PlayerI) => {
    try {
        const player: PlayerI = {
            _id: formData._id,
            name: formData.name,
            surname: formData.surname,
            position: formData.position,
            nationality: formData.nationality,
            rating: formData.rating,
            height: formData.height,
            weight: formData.weight,
            club: formData.club,
            tShirtNumber: formData.tShirtNumber,
            dateOfBirth: formData.dateOfBirth,
            imageUrl: formData.imageUrl,
        }
        const updatedPlayer: AxiosResponse = await axios.put(
            baseUrl + '/update-player/' + player._id,
            player
        )
        return updatedPlayer
    } catch (error) {
        // @ts-ignore
        throw new Error(error)
    }
}

export const deletePlayer = async (formData: PlayerI) => {
    try {
        const updatedPlayer: AxiosResponse = await axios.delete(
            baseUrl + '/delete-player/' + formData._id,
        )
        return updatedPlayer
    } catch (error) {
        // @ts-ignore
        throw new Error(error)
    }
}
