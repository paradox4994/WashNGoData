const mongoose = require('mongoose')
const {Schema} = mongoose

const templateSchema = new Schema({
    name: String,
    creator: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const TemplateModel = mongoose.model('Template',templateSchema)

module.exports = TemplateModel