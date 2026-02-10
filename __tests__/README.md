# Tests - Smayke API

Esta carpeta contiene las pruebas unitarias del proyecto usando **Jest**.

## 📁 Estructura de Tests

```
__tests__/
├── models/                 # Tests de modelos Mongoose
│   ├── producto.test.js   # Validaciones del modelo Producto
│   └── usuario.test.js    # Validaciones del modelo Usuario
├── controllers/           # Tests de controladores
│   └── allowKey.test.js   # Tests de generación de keys
└── utils/                 # Tests de utilidades
    └── validation.test.js # Tests de validación y seguridad
```

## 🚀 Comandos Disponibles

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch (se re-ejecutan al guardar cambios)
```bash
npm run test:watch
```

### Ejecutar tests con reporte de cobertura
```bash
npm run test:coverage
```

## 📊 Tests Implementados

### ✅ Modelos (Models)
- **Producto**: Validaciones de campos, precios, categorías
- **Usuario**: Validaciones de campos requeridos, email, password

### ✅ Controladores (Controllers)
- **AllowKey**: Generación de keys únicas y seguras

### ✅ Utilidades (Utils)
- **Validación de contraseñas**: Hash con bcrypt
- **Validación de emails**: Formato correcto
- **Validación de precios**: Números positivos

## 📝 Ejemplo de Salida

```
PASS  __tests__/models/producto.test.js
PASS  __tests__/models/usuario.test.js
PASS  __tests__/controllers/allowKey.test.js
PASS  __tests__/utils/validation.test.js

Test Suites: 4 passed, 4 total
Tests:       24 passed, 24 total
Snapshots:   0 total
Time:        2.456 s
```

## 🎯 Próximos Tests a Implementar

- [ ] Tests de integración con base de datos (MongoDB Memory Server)
- [ ] Tests de endpoints con Supertest
- [ ] Tests de autenticación y autorización
- [ ] Tests de manejo de errores
- [ ] Tests de middleware
