import {Document} from 'mongoose'

export interface ClubI extends Document {
    nickname: string
    mediumName: string
    shortName: string
    yearFounded: Date
    stadium: string
    league: string
    location: string
    country: string
    imageUrl: string
}