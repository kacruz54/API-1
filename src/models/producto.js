
const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
   nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
   },
   descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
   },
   precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
   },
   cantidad: {
    type: Number,
    required: [true, 'La cantidad es obligatoria'],
    min: [0, 'La cantidad no puede ser negativa'],
    default: 0
   },
   tamano: {
    type: String,
    required: [true, 'El tamaño es obligatorio']
   },
   categoria: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: [
      'Café en Grano',
      'Café Molido',
      'Café Instantáneo',
      'Cápsulas',
      'Accesorios',
      'Máquinas',
      'Otros'
    ]
   },
   origen: {
    type: String,
    required: false
   },
   tipoTostado: {
    type: String,
    required: false,
    enum: ['Claro', 'Medio', 'Oscuro', 'N/A'],
    default: 'N/A'
   },
   marca: {
    type: String,
    required: false
   },
   imagenes: {
    type: [String],
    default: []
   },
   estado: {
    type: String,
    required: true,
    enum: ['activo', 'inactivo'],
    default: 'activo'
   }
}, {
   timestamps: true
});

module.exports = model('Producto', ProductoSchema);
