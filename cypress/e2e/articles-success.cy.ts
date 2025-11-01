/// <reference types="cypress" />

describe("Success case: create an article and view its details", () => {
  const article = {
    title: "Cypress Test Article",
    category: "Test",
    subcategory: "E2E",
    author: "Cypress Bot",
    content: "This is a test article automatically created by Cypress.",
    image: "test",
    rating: 3,
  };

  it("creates a new article and verifies its detail page", () => {
    //list page
    cy.visit("/articles");
    cy.contains("List of articles").should("exist");

    //creation form
    cy.get('[data-cy="create-article-btn"]').click();
    cy.contains(/new article|create article/i).should("exist");

    //Fill out and submit the form
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

    //Wait for redirect to the list
    cy.location("pathname").should("include", "/articles");
    cy.contains(article.title).should("exist");
    cy.contains(article.title).click();

    //Verify article content
    cy.contains(article.title).should("exist");
    cy.contains(article.author).should("exist");
    cy.contains(article.content).should("exist");
    cy.contains(`${article.rating}/5`).should("exist");
    cy.get('[data-cy="rate-5"]').click();

    //Go back to the list
    cy.get('[data-cy="back-to-articles"]').click();
    cy.location("pathname").should("include", "/articles");

    //Go back to the detail page
    cy.contains(article.title).click();

    //Verify updated rating
    cy.contains("5/5").should("exist");

    // Delete
    cy.intercept("DELETE", "/api/articles/*").as("deleteArticle");
    cy.on("window:confirm", () => true); // accept confirmation dialog
    cy.intercept("PUT", "/api/articles").as("deleteArticle");
    cy.get('[data-cy="btn-delete-article"]').click();
    cy.contains(article.title).should("not.exist");
  });
});
