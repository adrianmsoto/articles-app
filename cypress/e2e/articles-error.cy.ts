/// <reference types="cypress" />

describe("Edge case: artículo no existente", () => {
  it("muestra error cuando el artículo no existe", () => {
    const nonExistentId = 9999;

    // Interceptamos la petición GET del artículo y forzamos un error 404
    cy.intercept("GET", `/api/articles/${nonExistentId}`, {
      statusCode: 404,
      body: { message: "Not found Article" },
    }).as("getArticle");

    // Visitamos la ruta del artículo directamente
    cy.visit(`/articles/${nonExistentId}`);

    // Esperamos a que se haga la request interceptada
    cy.wait("@getArticle");

    // Validamos que se muestra el mensaje de error
    cy.contains("Error: Not found Article").should("exist");

    // Verificamos que podemos volver al listado
    cy.get('[data-cy="back-to-articles"]').click();
    cy.location("pathname").should("include", "/articles");
  });
});
