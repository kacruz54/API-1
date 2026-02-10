describe('API - Productos CRUD', () => {
  const apiUrl = Cypress.env('apiUrl');
  let productoId;

  describe('POST /api/productos', () => {
    it('debe crear un nuevo producto', () => {
      cy.fixture('productos').then((productos) => {
        cy.request('POST', `${apiUrl}/productos`, productos.productoValido)
          .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('ok', true);
            expect(response.body).to.have.property('producto');
            expect(response.body.producto).to.have.property('_id');
            expect(response.body.producto.nombre).to.eq(productos.productoValido.nombre);
            expect(response.body.producto.precio).to.eq(productos.productoValido.precio);
            expect(response.body.producto.categoria).to.eq(productos.productoValido.categoria);
            
            productoId = response.body.producto._id;
            cy.log('Producto creado con ID:', productoId);
          });
      });
    });

    it('debe crear producto con categoría Insumos de pasteleria', () => {
      const producto = {
        nombre: 'Harina de Trigo',
        descripcion: 'Harina de trigo para repostería',
        precio: 5.99,
        cantidad: 50,
        tamano: '1kg',
        categoria: 'Insumos de pasteleria'
      };

      cy.request('POST', `${apiUrl}/productos`, producto)
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.producto.categoria).to.eq('Insumos de pasteleria');
        });
    });

    it('debe rechazar producto sin campos requeridos', () => {
      const productoInvalido = {
        nombre: 'Producto Sin Precio'
      };

      cy.request({
        method: 'POST',
        url: `${apiUrl}/productos`,
        body: productoInvalido,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body.ok).to.be.false;
      });
    });

    it('debe rechazar producto con categoría inválida', () => {
      const productoInvalido = {
        nombre: 'Producto Test',
        descripcion: 'Test',
        precio: 10,
        cantidad: 5,
        tamano: 'Test',
        categoria: 'Categoría Inválida'
      };

      cy.request({
        method: 'POST',
        url: `${apiUrl}/productos`,
        body: productoInvalido,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body.ok).to.be.false;
      });
    });
  });

  describe('GET /api/productos', () => {
    it('debe obtener lista de productos activos', () => {
      cy.request('GET', `${apiUrl}/productos`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('ok', true);
          expect(response.body).to.have.property('productos');
          expect(response.body).to.have.property('total');
          expect(response.body.productos).to.be.an('array');
          
          if (response.body.productos.length > 0) {
            response.body.productos.forEach(producto => {
              expect(producto).to.have.property('nombre');
              expect(producto).to.have.property('precio');
              expect(producto).to.have.property('estado', 'activo');
            });
          }
        });
    });

    it('debe soportar paginación', () => {
      cy.request('GET', `${apiUrl}/productos?desde=0&limite=5`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.productos.length).to.be.at.most(5);
        });
    });
  });

  describe('GET /api/productos/:id', () => {
    it('debe obtener un producto por ID', () => {
      cy.request('GET', `${apiUrl}/productos/${productoId}`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('ok', true);
          expect(response.body).to.have.property('producto');
          expect(response.body.producto._id).to.eq(productoId);
        });
    });

    it('debe retornar 404 para ID inexistente', () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      cy.request({
        method: 'GET',
        url: `${apiUrl}/productos/${fakeId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.ok).to.be.false;
      });
    });
  });

  describe('PUT /api/productos/:id', () => {
    it('debe actualizar un producto existente', () => {
      cy.fixture('productos').then((productos) => {
        cy.request('PUT', `${apiUrl}/productos/${productoId}`, productos.productoActualizado)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('ok', true);
            expect(response.body.producto.nombre).to.include('Actualizado');
            expect(response.body.producto.precio).to.eq(productos.productoActualizado.precio);
          });
      });
    });

    it('debe actualizar solo los campos enviados', () => {
      const actualizacionParcial = {
        cantidad: 999
      };

      cy.request('PUT', `${apiUrl}/productos/${productoId}`, actualizacionParcial)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.producto.cantidad).to.eq(999);
        });
    });
  });

  describe('DELETE /api/productos/:id', () => {
    it('debe hacer soft delete de un producto', () => {
      cy.request('DELETE', `${apiUrl}/productos/${productoId}`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('ok', true);
          expect(response.body.producto.estado).to.eq('inactivo');
        });
    });

    it('el producto eliminado no debe aparecer en GET', () => {
      cy.request('GET', `${apiUrl}/productos`)
        .then((response) => {
          const productosActivos = response.body.productos;
          const productoEliminado = productosActivos.find(p => p._id === productoId);
          expect(productoEliminado).to.be.undefined;
        });
    });

    it('el producto eliminado aún debe ser accesible por ID', () => {
      cy.request('GET', `${apiUrl}/productos/${productoId}`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.producto.estado).to.eq('inactivo');
        });
    });
  });

  describe('Validación de categorías', () => {
    const categoriasValidas = [
      'Insumos de pasteleria',
      'Insumos de cafeteria',
      'Snaks',
      'Otros'
    ];

    categoriasValidas.forEach((categoria) => {
      it(`debe aceptar categoría: ${categoria}`, () => {
        const producto = {
          nombre: `Producto ${categoria}`,
          descripcion: 'Test',
          precio: 10,
          cantidad: 5,
          tamano: 'Test',
          categoria: categoria
        };

        cy.request('POST', `${apiUrl}/productos`, producto)
          .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.producto.categoria).to.eq(categoria);
          });
      });
    });
  });
});
