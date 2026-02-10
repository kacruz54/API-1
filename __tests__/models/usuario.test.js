const mongoose = require('mongoose');
const Usuario = require('../../src/models/usuario');

describe('Modelo Usuario', () => {
  describe('Validaciones del Schema', () => {
    test('debe crear un usuario válido', () => {
      const usuarioData = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        password: 'password123',
        rol: 'USER_ROLE',
        allow_key: 'abc123def456'
      };

      const usuario = new Usuario(usuarioData);
      const error = usuario.validateSync();

      expect(error).toBeUndefined();
      expect(usuario.name).toBe('Juan Pérez');
      expect(usuario.email).toBe('juan@example.com');
      expect(usuario.rol).toBe('USER_ROLE');
    });

    test('debe fallar si falta el nombre', () => {
      const usuarioData = {
        email: 'juan@example.com',
        password: 'password123',
        rol: 'USER_ROLE',
        allow_key: 'abc123'
      };

      const usuario = new Usuario(usuarioData);
      const error = usuario.validateSync();

      expect(error).toBeDefined();
      expect(error.errors.name).toBeDefined();
    });

    test('debe fallar si falta el email', () => {
      const usuarioData = {
        name: 'Juan Pérez',
        password: 'password123',
        rol: 'USER_ROLE',
        allow_key: 'abc123'
      };

      const usuario = new Usuario(usuarioData);
      const error = usuario.validateSync();

      expect(error).toBeDefined();
      expect(error.errors.email).toBeDefined();
    });

    test('debe fallar si falta la password', () => {
      const usuarioData = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        rol: 'USER_ROLE',
        allow_key: 'abc123'
      };

      const usuario = new Usuario(usuarioData);
      const error = usuario.validateSync();

      expect(error).toBeDefined();
      expect(error.errors.password).toBeDefined();
    });

    test('debe fallar si falta allow_key', () => {
      const usuarioData = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        password: 'password123',
        rol: 'USER_ROLE'
      };

      const usuario = new Usuario(usuarioData);
      const error = usuario.validateSync();

      expect(error).toBeDefined();
      expect(error.errors.allow_key).toBeDefined();
    });
  });
});
