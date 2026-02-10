describe('API - Autenticación', () => {
  const apiUrl = Cypress.env('apiUrl');
  let allowKey;
  let userId;

  before(() => {
    cy.request('POST', `${apiUrl}/allow-key/generate`)
      .then((response) => {
        allowKey = response.body.key;
        cy.log('Allow Key obtenida:', allowKey);
      });
  });

  describe('POST /api/auth/new-user', () => {
    it('debe crear un nuevo usuario con allow_key válida', () => {
      cy.fixture('usuarios').then((usuarios) => {
        const usuario = {
          ...usuarios.usuarioValido,
          allow_key: allowKey,
          email: `test_${Date.now()}@example.com`
        };

        cy.request('POST', `${apiUrl}/auth/new-user`, usuario)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('ok', true);
            expect(response.body).to.have.property('user');
            expect(response.body.user).to.have.property('id');
            expect(response.body.user.name).to.eq(usuario.name);
            expect(response.body.user.email).to.eq(usuario.email);
            expect(response.body.user).to.not.have.property('password');
            
            userId = response.body.user.id;
          });
      });
    });

    it('debe rechazar creación de usuario con allow_key inválida', () => {
      cy.fixture('usuarios').then((usuarios) => {
        const usuario = {
          ...usuarios.usuarioValido,
          allow_key: 'keyinvalida123',
          email: `test_invalid_${Date.now()}@example.com`
        };

        cy.request({
          method: 'POST',
          url: `${apiUrl}/auth/new-user`,
          body: usuario,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(403);
          expect(response.body.ok).to.be.false;
          expect(response.body.msg).to.include('no es válida');
        });
      });
    });

    it('debe rechazar creación sin allow_key', () => {
      cy.fixture('usuarios').then((usuarios) => {
        const usuario = {
          name: usuarios.usuarioValido.name,
          email: `test_no_key_${Date.now()}@example.com`,
          password: usuarios.usuarioValido.password,
          rol: usuarios.usuarioValido.rol
        };

        cy.request({
          method: 'POST',
          url: `${apiUrl}/auth/new-user`,
          body: usuario,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([400, 403, 500]);
        });
      });
    });
  });

  describe('POST /api/auth/login', () => {
    let testUserEmail;
    let testUserPassword = 'password123';

    before(() => {
      testUserEmail = `test_login_${Date.now()}@example.com`;
      const usuario = {
        name: 'Usuario Login Test',
        email: testUserEmail,
        password: testUserPassword,
        rol: 'USER_ROLE',
        allow_key: allowKey
      };

      cy.request('POST', `${apiUrl}/auth/new-user`, usuario);
    });

    it('debe hacer login exitoso con credenciales correctas', () => {
      cy.request('POST', `${apiUrl}/auth/login`, {
        email: testUserEmail,
        password: testUserPassword
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('ok', true);
        expect(response.body).to.have.property('user');
        expect(response.body.user.email).to.eq(testUserEmail);
      });
    });

    it('debe rechazar login con contraseña incorrecta', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/auth/login`,
        body: {
          email: testUserEmail,
          password: 'wrongpassword'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.ok).to.be.false;
      });
    });

    it('debe rechazar login con email inexistente', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/auth/login`,
        body: {
          email: 'noexiste@example.com',
          password: 'password123'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.ok).to.be.false;
      });
    });
  });

  describe('GET /api/auth/users', () => {
    it('debe obtener lista de usuarios USER_ROLE', () => {
      cy.request('GET', `${apiUrl}/auth/users`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('ok', true);
          expect(response.body).to.have.property('usuarios');
          expect(response.body.usuarios).to.be.an('array');
          
          if (response.body.usuarios.length > 0) {
            response.body.usuarios.forEach(usuario => {
              expect(usuario).to.have.property('name');
              expect(usuario).to.have.property('email');
              expect(usuario).to.have.property('rol', 'USER_ROLE');
              expect(usuario).to.not.have.property('password');
              expect(usuario).to.not.have.property('allow_key');
            });
          }
        });
    });
  });
});
