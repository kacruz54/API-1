// Comandos personalizados para Cypress

Cypress.Commands.add('generarAllowKey', () => {
  const apiUrl = Cypress.env('apiUrl');
  return cy.request('POST', `${apiUrl}/allow-key/generate`)
    .then((response) => {
      return response.body.key;
    });
});

Cypress.Commands.add('crearUsuario', (usuario) => {
  const apiUrl = Cypress.env('apiUrl');
  return cy.generarAllowKey().then((key) => {
    const usuarioConKey = {
      ...usuario,
      allow_key: key
    };
    return cy.request('POST', `${apiUrl}/auth/new-user`, usuarioConKey)
      .then((response) => response.body.user);
  });
});

Cypress.Commands.add('login', (email, password) => {
  const apiUrl = Cypress.env('apiUrl');
  return cy.request('POST', `${apiUrl}/auth/login`, { email, password })
    .then((response) => response.body);
});

Cypress.Commands.add('crearProducto', (producto) => {
  const apiUrl = Cypress.env('apiUrl');
  return cy.request('POST', `${apiUrl}/productos`, producto)
    .then((response) => response.body.producto);
});

Cypress.Commands.add('limpiarProductos', () => {
  const apiUrl = Cypress.env('apiUrl');
  return cy.request('GET', `${apiUrl}/productos`)
    .then((response) => {
      const productos = response.body.productos;
      const deletePromises = productos.map((producto) => 
        cy.request('DELETE', `${apiUrl}/productos/${producto._id}`)
      );
      return Cypress.Promise.all(deletePromises);
    });
});
