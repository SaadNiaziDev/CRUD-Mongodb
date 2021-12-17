const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const curdSchema = new Schema({
    age : {
        type: 'number',
        required:"true"
    },
    name: {
        type: 'string',
        required:"true",
    },
    rollNumber: {
        type: 'string',
        required:"true",
    }
})

const CurdModel = mongoose.model('CurdModel',curdSchema);

module.exports = CurdModel;