/*global cy*/

describe("test the form inputs and submission", function() {
    this.beforeEach(function () {
        cy.visit("http://localhost:3000/")
    });

    it("adds text to name input", function() {
        cy.get('[data-cy=name]')
        .type("Jaxon Oliver")
        .should("have.value", "Jaxon Oliver");

        cy.get('[for="email"] > input')
        .type("JaxAtx@gmail.com")
        .should("have.value", "JaxAtx@gmail.com")

        cy.get('#password')
        .type("snifjeknmnshdfhkj")
        .should("have.value", "snifjeknmnshdfhkj")

        cy.get('textarea')
        .type("Reasons for being an awesome tema member")
        .should("have.value", "Reasons for being an awesome tema member")

        cy.get('[type="checkbox"]')
        .check()
        .should("be.checked")

    });
})