const mongoose = require('mongoose');
const Producto = require('../../src/models/producto');

describe('Modelo Producto', () => {
  describe('Validaciones del Schema', () => {
    test('debe crear un producto válido', () => {
      const productoData = {
        nombre: 'Café Colombiano',
        descripcion: 'Café premium de Colombia',
        precio: 25.99,
        cantidad: 100,
        tamano: '500g',
        categoria: 'Insumos de cafeteria',
        origen: 'Colombia',
        tipoTostado: 'Medio',
        marca: 'Smayke Coffee',
        imagenes: ['imagen1.jpg'],
        estado: 'activo'
      };

      const producto = new Producto(productoData);
      const error = producto.validateSync();

      expect(error).toBeUndefined();
      expect(producto.nombre).toBe('Café Colombiano');
      expect(producto.precio).toBe(25.99);
      expect(producto.categoria).toBe('Insumos de cafeteria');
    });

    test('debe fallar si falta el nombre', () => {
      const productoData = {
        descripcion: 'Café premium',
        precio: 25.99,
        cantidad: 100,
        tamano: '500g',
        categoria: 'Insumos de cafeteria'
      };

      const producto = new Producto(productoData);
      const error = producto.validateSync();

      expect(error).toBeDefined();
      expect(error.errors.nombre).toBeDefined();
    });

    test('debe fallar si el precio es negativo', () => {
      const productoData = {
        nombre: 'Café Test',
        descripcion: 'Descripción',
        precio: -10,
        cantidad: 100,
        tamano: '500g',
        categoria: 'Insumos de cafeteria'
      };

      const producto = new Producto(productoData);
      const error = producto.validateSync();

      expect(error).toBeDefined();
      expect(error.errors.precio).toBeDefined();
    });

    test('debe fallar si la categoría no es válida', () => {
      const productoData = {
        nombre: 'Café Test',
        descripcion: 'Descripción',
        precio: 25.99,
        cantidad: 100,
        tamano: '500g',
        categoria: 'Categoría Inválida'
      };

      const producto = new Producto(productoData);
      const error = producto.validateSync();

      expect(error).toBeDefined();
      expect(error.errors.categoria).toBeDefined();
    });

    test('debe tener estado "activo" por defecto', () => {
      const productoData = {
        nombre: 'Café Test',
        descripcion: 'Descripción',
        precio: 25.99,
        cantidad: 100,
        tamano: '500g',
        categoria: 'Insumos de cafeteria'
      };

      const producto = new Producto(productoData);

      expect(producto.estado).toBe('activo');
    });

    test('debe aceptar todas las categorías válidas', () => {
      const categoriasValidas = [
        'Insumos de pasteleria',
        'Insumos de cafeteria',
        'Snaks',
        'Otros'
      ];

      categoriasValidas.forEach(categoria => {
        const productoData = {
          nombre: 'Test',
          descripcion: 'Test',
          precio: 10,
          cantidad: 1,
          tamano: 'Test',
          categoria: categoria
        };

        const producto = new Producto(productoData);
        const error = producto.validateSync();

        expect(error).toBeUndefined();
      });
    });
  });
});
