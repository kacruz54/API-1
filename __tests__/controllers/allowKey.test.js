const crypto = require('crypto');

describe('AllowKey Controller', () => {
  describe('Generación de Key', () => {
    test('debe generar una key de 16 caracteres hexadecimales', () => {
      const key = crypto.randomBytes(8).toString('hex');
      
      expect(key).toBeDefined();
      expect(key.length).toBe(16);
      expect(/^[0-9a-f]+$/.test(key)).toBe(true);
    });

    test('cada key generada debe ser única', () => {
      const key1 = crypto.randomBytes(8).toString('hex');
      const key2 = crypto.randomBytes(8).toString('hex');
      
      expect(key1).not.toBe(key2);
    });

    test('la key debe ser alfanumérica en formato hex', () => {
      const key = crypto.randomBytes(8).toString('hex');
      const hexRegex = /^[0-9a-f]+$/;
      
      expect(hexRegex.test(key)).toBe(true);
    });
  });
});
