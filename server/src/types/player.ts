import {Document} from 'mongoose'

export interface PlayerI extends Document {
    name: string
    surname: string
    position: string
    rating: number|string
    nationality: string
    height: number|string
    weight: number|string
    club: string
    tShirtNumber: number|string
    dateOfBirth: Date|string
    imageUrl: string
}