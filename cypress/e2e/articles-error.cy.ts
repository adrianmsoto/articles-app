/// <reference types="cypress" />
describe("Edge case: no exist article", () => {
  it("Show error if article doesnt exist", () => {
    const nonExistentId = 9999;

    cy.visit(`/articles/${nonExistentId}`);
    cy.contains("Error: Not found Article", { timeout: 120_000 }).should(
      "exist"
    );
    cy.get('[data-cy="back-to-articles"]').click();
    cy.location("pathname").should("include", "/articles");
  });
});
