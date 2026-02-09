
const { Schema, model } = require('mongoose');

const AllowKeySchema = Schema({
   key: {
    type: String,
    required: [true, 'La key es obligatoria'],
    unique: true
   },
   isActive: {
    type: Boolean,
    default: true
   }
}, {
   timestamps: true
});

module.exports = model('AllowKey', AllowKeySchema);
