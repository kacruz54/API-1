// Import commands
import './commands';

// Configuración global
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevenir que Cypress falle en excepciones no capturadas
  return false;
});

// Hooks globales
before(() => {
  cy.log('🚀 Iniciando tests de integración API');
});

after(() => {
  cy.log('✅ Tests completados');
});
