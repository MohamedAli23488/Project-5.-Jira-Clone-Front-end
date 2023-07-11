describe('Issue Delete', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
            cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        });
    });
    //Test 1: Create a new test case for deleting issue
    it('Should Delete an issue and Confirm deletion', () => {
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]').should('be.visible');
        cy.get('[data-testid="modal:confirm"]').contains('Delete issue').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.reload();
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
                .contains('This is an issue of type: Task.').should('not.exist')
        })
    })
    //Test 2: Create new test case for starting the deleting issue process, but cancelling this action
    it('Should Cancelling the Deletion process of an issue', () => {
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]').should('be.visible');
        cy.get('[data-testid="modal:confirm"]').contains('Cancel').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('[data-testid="icon:close"]').first().click();
        cy.reload();
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
                .contains('This is an issue of type: Task.').should('exist')
        })
    })
})