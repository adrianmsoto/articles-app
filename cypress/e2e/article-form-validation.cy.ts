/// <reference types="cypress" />

describe("Form validation: prevent empty article submission", () => {
  it("should show validation errors when submitting an empty form", () => {
    //Visit the article list go new article
    cy.visit("/articles");
    cy.contains("List of articles").should("exist");
    cy.get('[data-cy="create-article-btn"]').click();
    cy.contains(/new article|create article/i).should("exist");

    //Try to submit without filling any field
    cy.get('button[data-cy="submit-article"]').click();
    cy.contains("Title is required").should("be.visible");
    cy.contains("Category is required").should("be.visible");
    cy.contains("Author is required").should("be.visible");
    cy.contains("Content is required").should("be.visible");
    cy.location("pathname").should("include", "/articles/new");
    cy.visit("/articles");
    cy.contains("Title is required").should("not.exist");
  });
});
