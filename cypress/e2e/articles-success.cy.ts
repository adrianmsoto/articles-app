/// <reference types="cypress" />
describe("Caso de éxito: crear un artículo y verlo en el detalle", () => {
  const article = {
    title: "Artículo de prueba Cypress",
    category: "Test",
    subcategory: "E2E",
    author: "Cypress Bot",
    content: "Este es un artículo de prueba creado automáticamente.",
    image: "test",
    rating: 3,
  };

  it("crea un nuevo artículo y verifica su detalle", () => {
    // 1️⃣ Visitar lista
    cy.visit("/articles");
    cy.contains("List of articles").should("exist");

    // 2️⃣ Ir al formulario
    cy.get('[data-cy="create-article-btn"]').click();
    cy.contains(/nuevo artículo|create article|new article/i).should("exist");

    // 3️⃣ Llenar y enviar formulario
    cy.get('input[name="title"]').type(article.title);
    cy.get('input[name="category"]').type(article.category);
    cy.get('input[name="subcategory"]').type(article.subcategory);
    cy.get('input[name="author"]').type(article.author);
    cy.get('textarea[name="content"]').type(article.content);
    cy.get('input[name="rating"]')
      .focus()
      .clear({ force: true })
      .type("{selectall}{backspace}3", { delay: 100, force: true });
    cy.get("form").submit();

    // 4️⃣ Esperar redirección al listado
    cy.location("pathname").should("include", "/articles");

    // 5️⃣ Verificar que aparece el artículo creado
    cy.contains(article.title).should("exist");

    // 6️⃣ Entrar al detalle
    cy.contains(article.title).click();

    // 7️⃣ Verificar el contenido
    cy.contains(article.title).should("exist");
    cy.contains(article.author).should("exist");
    cy.contains(article.content).should("exist");
    cy.contains(`${article.rating}/5`).should("exist");
    cy.get('[data-cy="rate-5"]').click();

    // 9️⃣ Volver al listado
    cy.get('[data-cy="back-to-articles"]').click();
    cy.location("pathname").should("include", "/articles");

    // 🔟 Volver al detalle
    cy.contains(article.title).click();

    // 1️⃣1️⃣ Verificar rating actualizado
    cy.contains("5/5").should("exist");

    cy.intercept("DELETE", "/api/articles/*").as("deleteArticle");
    cy.on("window:confirm", () => true); // aceptar el confirm
    cy.intercept("PUT", "/api/articles").as("deleteArticle");
    cy.get('[data-cy="btn-delete-article"]').click();
    cy.contains(article.title).should("not.exist");
  });
});
