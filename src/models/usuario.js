
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
   name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
   },
   email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
   },
   password: {
    type: String,
    required: [true, 'La contrasena es obligatorio'],
    unique: true
   },
   img: {
    type: String,
   },
    rol: {
     type: String,
     required: true,
     emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
     type: Boolean,
     default: true
    },
    google: {
     type: Boolean,
     default: false
    }


});

module.exports = model('Usuario', UsuarioSchema);