const bcryptjs = require('bcryptjs');

describe('Utilidades de Validación', () => {
  describe('Hashing de Contraseñas', () => {
    test('debe hashear una contraseña correctamente', () => {
      const password = 'password123';
      const salt = bcryptjs.genSaltSync();
      const hashedPassword = bcryptjs.hashSync(password, salt);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(50);
    });

    test('debe verificar una contraseña hasheada correctamente', () => {
      const password = 'password123';
      const salt = bcryptjs.genSaltSync();
      const hashedPassword = bcryptjs.hashSync(password, salt);

      const isValid = bcryptjs.compareSync(password, hashedPassword);
      expect(isValid).toBe(true);
    });

    test('debe rechazar una contraseña incorrecta', () => {
      const password = 'password123';
      const wrongPassword = 'wrongPassword';
      const salt = bcryptjs.genSaltSync();
      const hashedPassword = bcryptjs.hashSync(password, salt);

      const isValid = bcryptjs.compareSync(wrongPassword, hashedPassword);
      expect(isValid).toBe(false);
    });

    test('dos hashes de la misma contraseña deben ser diferentes', () => {
      const password = 'password123';
      
      const salt1 = bcryptjs.genSaltSync();
      const hash1 = bcryptjs.hashSync(password, salt1);
      
      const salt2 = bcryptjs.genSaltSync();
      const hash2 = bcryptjs.hashSync(password, salt2);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('Validación de Email', () => {
    test('debe validar emails correctos', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      expect(emailRegex.test('test@example.com')).toBe(true);
      expect(emailRegex.test('user.name@domain.co')).toBe(true);
      expect(emailRegex.test('user+tag@example.com')).toBe(true);
    });

    test('debe rechazar emails incorrectos', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      expect(emailRegex.test('invalid')).toBe(false);
      expect(emailRegex.test('invalid@')).toBe(false);
      expect(emailRegex.test('@example.com')).toBe(false);
      expect(emailRegex.test('invalid@domain')).toBe(false);
    });
  });

  describe('Validación de Precios', () => {
    test('debe validar precios positivos', () => {
      const validarPrecio = (precio) => precio >= 0;

      expect(validarPrecio(10)).toBe(true);
      expect(validarPrecio(0)).toBe(true);
      expect(validarPrecio(99.99)).toBe(true);
    });

    test('debe rechazar precios negativos', () => {
      const validarPrecio = (precio) => precio >= 0;

      expect(validarPrecio(-1)).toBe(false);
      expect(validarPrecio(-10.50)).toBe(false);
    });
  });
});
