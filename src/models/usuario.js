
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
   rol: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
   },
   allow_key: {
    type: String,
    required: [true, 'El allow_key es obligatorio']
   }
}, {
   timestamps: true
});

module.exports = model('usuario', UsuarioSchema);