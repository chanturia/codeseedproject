import {PlayerI} from '../types/player';
import {model, Schema} from 'mongoose'

const playerSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: false
    },
    weight: {
        type: String,
        required: false
    },
    club: {
        type: String,
        required: false
    },
    tShirtNumber: {
        type: Number,
        required: false
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }

}, {timestamps: true})


export default model<PlayerI>('players', playerSchema)