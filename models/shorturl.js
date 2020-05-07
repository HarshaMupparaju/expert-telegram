const mongoose = require ('mongoose')
const shortid= require ('shortid')

const shortUrlSchema = new mongoose.Schema ({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortid.generate
    },
    time: {
        type:Date,
        default:Date.now
    }
    })


    module.exports= mongoose.model('shortUrl', shortUrlSchema)