# Guía de Testing - Smayke API

Esta guía te ayudará a ejecutar todas las pruebas del proyecto.

## 📋 Tipos de Tests

### 1. **Tests Unitarios** (Jest)
Prueban componentes individuales de manera aislada.

- **Modelos**: Validaciones de schemas
- **Utilidades**: Funciones helper
- **Lógica de negocio**: Funciones puras

### 2. **Tests de Integración E2E** (Cypress)
Prueban la API completa con peticiones HTTP reales.

- **Endpoints completos**
- **Flujos de usuario**
- **Interacción con base de datos**

---

## 🚀 Ejecutar Tests

### Tests Unitarios (Jest)

```bash
# Ejecutar todos los tests unitarios
npm test

# Ejecutar tests en modo watch (re-ejecuta al guardar)
npm run test:watch

# Ejecutar con reporte de cobertura
npm run test:coverage
```

**Resultado esperado:**
```
Test Suites: 4 passed, 4 total
Tests:       22 passed, 22 total
Time:        1.315 s
```

---

### Tests E2E (Cypress)

**⚠️ IMPORTANTE:** El servidor debe estar corriendo antes de ejecutar Cypress.

#### Paso 1: Iniciar el servidor
```bash
# Terminal 1
npm run dev
```

#### Paso 2: Ejecutar Cypress

**Modo Interactivo (UI):**
```bash
# Terminal 2
npm run test:e2e:open
```

**Modo Headless (CI/CD):**
```bash
# Terminal 2
npm run test:e2e
```

**Resultado esperado:**
```
  Running:  01-allowKey.cy.js      (1 of 3)
    ✓ debe generar una nueva allow key
    ✓ debe actualizar la key existente
    4 passing (523ms)

  Running:  02-auth.cy.js          (2 of 3)
    ✓ debe crear un nuevo usuario
    ✓ debe hacer login exitoso
    8 passing (1.2s)

  Running:  03-productos.cy.js     (3 of 3)
    ✓ debe crear un nuevo producto
    ✓ debe obtener lista de productos
    15 passing (2.1s)

  All specs passed!  27 tests ✅
```

---

## 📊 Cobertura de Tests

### Ver Reporte de Cobertura

```bash
npm run test:coverage
```

Esto generará:
- **Reporte en consola**
- **Reporte HTML** en `coverage/lcov-report/index.html`

Abre el reporte HTML en tu navegador:
```bash
open coverage/lcov-report/index.html
```

---

## 🎯 Flujo de Testing Completo

### Desarrollo Local

1. **Iniciar servidor:**
   ```bash
   npm run dev
   ```

2. **Tests Unitarios (ventana separada):**
   ```bash
   npm run test:watch
   ```

3. **Tests E2E cuando sea necesario:**
   ```bash
   npm run test:e2e:open
   ```

### Pre-Commit / CI/CD

```bash
# Ejecutar todos los tests
npm test && npm run test:e2e
```

---

## 🧪 Tests Implementados

### ✅ Jest (Unitarios) - 22 tests

| Archivo | Tests | Descripción |
|---------|-------|-------------|
| `producto.test.js` | 6 | Validaciones de modelo Producto |
| `usuario.test.js` | 5 | Validaciones de modelo Usuario |
| `allowKey.test.js` | 3 | Generación de keys |
| `validation.test.js` | 8 | Utilidades de validación |

### ✅ Cypress (E2E) - ~27 tests

| Archivo | Tests | Descripción |
|---------|-------|-------------|
| `01-allowKey.cy.js` | 4 | CRUD de allow_key |
| `02-auth.cy.js` | 8 | Autenticación completa |
| `03-productos.cy.js` | 15 | CRUD de productos |

---

## 🔧 Configuración

### Jest (`jest.config.js`)
```javascript
{
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  testTimeout: 10000
}
```

### Cypress (`cypress.config.js`)
```javascript
{
  baseUrl: 'http://localhost:3000',
  env: {
    apiUrl: 'http://localhost:3000/api'
  }
}
```

---

## 🐛 Troubleshooting

### Jest

**Error:** `Cannot find module`
```bash
npm install
```

### Cypress

**Error:** `connect ECONNREFUSED`
**Solución:** El servidor no está corriendo
```bash
npm run dev
```

**Error:** `MongooseServerSelectionError`
**Solución:** MongoDB no está conectado
- Verifica la URL de MongoDB en `.env`
- Asegúrate de que MongoDB esté corriendo

**Error:** Tests fallan aleatoriamente
**Solución:** Aumenta los timeouts en `cypress.config.js`

---

## 📈 Métricas de Calidad

### Objetivos de Cobertura

- **Modelos:** > 90%
- **Controladores:** > 80%
- **Utilidades:** > 90%
- **Total:** > 80%

### Tiempo de Ejecución

- **Jest:** < 5 segundos
- **Cypress:** < 1 minuto

---

## 🎓 Escribir Nuevos Tests

### Test Unitario (Jest)

```javascript
// __tests__/utils/helper.test.js
describe('Helper Function', () => {
  test('debe hacer algo', () => {
    const resultado = miFuncion();
    expect(resultado).toBe(esperado);
  });
});
```

### Test E2E (Cypress)

```javascript
// cypress/e2e/04-nuevo.cy.js
describe('API - Nuevo Feature', () => {
  it('debe funcionar correctamente', () => {
    cy.request('GET', '/api/endpoint')
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
});
```

---

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/)
- [Cypress Documentation](https://docs.cypress.io/)
- [API Testing Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

¡Happy Testing! 🚀✅
