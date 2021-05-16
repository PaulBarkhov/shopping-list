const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: false},
    data: [{}],
    comment: {type: String, required: false},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model( 'List', schema)