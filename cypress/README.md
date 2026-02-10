# Tests E2E con Cypress - Smayke API

Esta carpeta contiene las pruebas de integración End-to-End (E2E) usando **Cypress**.

## 📁 Estructura de Cypress

```
cypress/
├── e2e/                          # Tests de integración
│   ├── 01-allowKey.cy.js        # Tests de allow_key
│   ├── 02-auth.cy.js            # Tests de autenticación
│   └── 03-productos.cy.js       # Tests CRUD de productos
├── fixtures/                     # Datos de prueba
│   ├── productos.json           # Fixtures de productos
│   └── usuarios.json            # Fixtures de usuarios
└── support/                      # Comandos personalizados
    ├── commands.js              # Comandos customizados
    └── e2e.js                   # Configuración global
```

## 🚀 Comandos Disponibles

### Abrir Cypress UI (Modo Interactivo)
```bash
npm run test:e2e:open
```

### Ejecutar tests en modo headless (CI/CD)
```bash
npm run test:e2e
```

## ⚙️ Pre-requisitos

Antes de ejecutar los tests E2E, asegúrate de:

1. **El servidor debe estar corriendo:**
   ```bash
   npm run dev
   ```

2. **La base de datos debe estar accesible**

3. **El servidor debe estar en:** `http://localhost:3000`

## 📝 Tests Implementados

### ✅ 1. Allow Key (`01-allowKey.cy.js`)
- ✅ Generar nueva allow key
- ✅ Actualizar key existente
- ✅ Obtener key actual
- ✅ Validar formato hexadecimal

### ✅ 2. Autenticación (`02-auth.cy.js`)
- ✅ Crear usuario con key válida
- ✅ Rechazar usuario con key inválida
- ✅ Login exitoso
- ✅ Login con credenciales incorrectas
- ✅ Obtener lista de usuarios

### ✅ 3. Productos CRUD (`03-productos.cy.js`)
- ✅ Crear producto
- ✅ Obtener lista de productos
- ✅ Obtener producto por ID
- ✅ Actualizar producto
- ✅ Eliminar producto (soft delete)
- ✅ Validar todas las categorías
- ✅ Paginación
- ✅ Validaciones de campos

## 🎯 Comandos Personalizados

### `cy.generarAllowKey()`
Genera una nueva allow key y la retorna.

```javascript
cy.generarAllowKey().then((key) => {
  cy.log('Key:', key);
});
```

### `cy.crearUsuario(usuario)`
Crea un usuario con allow_key automática.

```javascript
cy.crearUsuario({
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  rol: 'USER_ROLE'
});
```

### `cy.login(email, password)`
Hace login y retorna los datos del usuario.

```javascript
cy.login('test@example.com', 'password123').then((response) => {
  cy.log('Usuario:', response.user);
});
```

### `cy.crearProducto(producto)`
Crea un producto y retorna el objeto creado.

```javascript
cy.crearProducto({
  nombre: 'Café Test',
  descripcion: 'Test',
  precio: 10,
  cantidad: 5,
  tamano: '500g',
  categoria: 'Insumos de cafeteria'
});
```

## 📊 Ejemplo de Salida

```
  Running:  01-allowKey.cy.js
    API - Allow Key
      POST /api/allow-key/generate
        ✓ debe generar una nueva allow key (234ms)
        ✓ debe actualizar la key existente al generar una nueva (89ms)
      GET /api/allow-key/current
        ✓ debe obtener la key actual (45ms)
        ✓ la key debe tener formato hexadecimal (38ms)

  4 passing (523ms)
```

## 🔧 Configuración

La configuración se encuentra en `cypress.config.js`:

```javascript
{
  baseUrl: 'http://localhost:3000',
  env: {
    apiUrl: 'http://localhost:3000/api'
  }
}
```

## 🎥 Videos y Screenshots

- **Videos:** Desactivados por defecto
- **Screenshots:** Solo en caso de fallo
- Los archivos se guardan en `cypress/screenshots/`

## 🚨 Troubleshooting

### El servidor no está corriendo
```bash
Error: connect ECONNREFUSED 127.0.0.1:3000
```
**Solución:** Asegúrate de que el servidor esté corriendo con `npm run dev`

### Base de datos no conectada
```bash
Error: MongooseServerSelectionError
```
**Solución:** Verifica que MongoDB esté corriendo y la URL de conexión sea correcta

## 📈 Próximos Tests a Implementar

- [ ] Tests de autorización (admin vs user)
- [ ] Tests de middleware de autenticación
- [ ] Tests de actualización de usuarios
- [ ] Tests de eliminación de usuarios
- [ ] Tests de búsqueda y filtros de productos
- [ ] Tests de validación de imágenes
- [ ] Tests de performance
