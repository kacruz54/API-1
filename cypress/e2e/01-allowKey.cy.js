describe('API - Allow Key', () => {
  const apiUrl = Cypress.env('apiUrl');
  let generatedKey;

  describe('POST /api/allow-key/generate', () => {
    it('debe generar una nueva allow key', () => {
      cy.request('POST', `${apiUrl}/allow-key/generate`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('ok', true);
          expect(response.body).to.have.property('key');
          expect(response.body.key).to.have.length(16);
          
          generatedKey = response.body.key;
          cy.log('Key generada:', generatedKey);
        });
    });

    it('debe actualizar la key existente al generar una nueva', () => {
      cy.request('POST', `${apiUrl}/allow-key/generate`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.msg).to.include('actualizada');
          expect(response.body.key).to.not.equal(generatedKey);
        });
    });
  });

  describe('GET /api/allow-key/current', () => {
    it('debe obtener la key actual', () => {
      cy.request('GET', `${apiUrl}/allow-key/current`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('ok', true);
          expect(response.body).to.have.property('key');
          expect(response.body).to.have.property('isActive');
          expect(response.body.isActive).to.be.true;
        });
    });

    it('la key debe tener formato hexadecimal', () => {
      cy.request('GET', `${apiUrl}/allow-key/current`)
        .then((response) => {
          const hexRegex = /^[0-9a-f]+$/;
          expect(hexRegex.test(response.body.key)).to.be.true;
        });
    });
  });
});
