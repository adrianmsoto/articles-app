/// <reference types="cypress" />
describe("Edge case: artículo no existente", () => {
  it("muestra error cuando el artículo no existe", () => {
    const nonExistentId = 9999;

    // Visitamos la ruta del artículo directamente
    cy.visit(`/articles/${nonExistentId}`);

    // Esperamos hasta 2 minutos a que aparezca el mensaje de error
    cy.contains("Error: Not found Article", { timeout: 120_000 }).should(
      "exist"
    );

    // Verificamos que podemos volver al listado
    cy.get('[data-cy="back-to-articles"]').click();
    cy.location("pathname").should("include", "/articles");
  });
});
