import {ClubI} from '../types/club';
import {model, Schema} from 'mongoose'

const ClubSchema: Schema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    mediumName: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    yearFounded: {
        type: Date,
        required: true
    },
    stadium: {
        type: String,
        required: true
    },
    league: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    }
}, {timestamps: true})


export default model<ClubI>('clubs', ClubSchema)