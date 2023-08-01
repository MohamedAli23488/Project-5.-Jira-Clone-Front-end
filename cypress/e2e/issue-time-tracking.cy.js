const Reporter = '[data-testid="select:reporterId"]';
const description = 'This is my time track'
const title = 'Timetrack';
const Success = 'Issue has been successfully created.';
const Submit = 'button[type="submit"]';
function NewIssue() {
    cy.get('[data-testid="icon:plus"]').click();
    cy.get('input[name="title"]').type('Mohamed');
    cy.get('[data-testid="form-field:reporterId"]').click();
    cy.get('[data-testid="select-option:Pickle Rick"]').click();
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.reload();
    cy.get('[data-testid="board-list:backlog').should('be.visible').within(() => {
        cy.get('[data-testid="list-issue"]')
            .first()
            .find('p')
            .click();
    });
}

describe('issue-time-tracking', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            NewIssue()
        });
    });

    it('ADD Update and Removing Estimated Time', () => {
        // Adding Estimated Time
        cy.contains('No time logged').should('be.visible')
        cy.get('input[placeholder="Number"]')
            //.eq(0)
            .type('10');
        cy.contains('10h estimated').should('be.visible');
        cy.get('[data-testid="icon:close"]')
            .first()
            .click();
        cy.get('[data-testid="board-list:backlog').should('be.visible')
        cy.get('[data-testid="list-issue"]')
            .first()
            .find('p')
            .click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('input[placeholder="Number"]')
            .eq(0)
            .should('have.value', '10');
        cy.contains('10h estimated').should('be.visible')
        // Updating Estimated Time
        cy.get('input[placeholder="Number"]')
            //.eq(0)
            .clear()
            .type('20')
            .should('have.value', '20');
        cy.contains('20h estimated').should('be.visible');
        cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        cy.get('[data-testid="board-list:backlog').should('be.visible')
        cy.get('[data-testid="list-issue"]')
            .first()
            .find('p')
            .click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('input[placeholder="Number"]')
            .eq(0)
            .should('have.value', '20');
        cy.contains('20h estimated').should('be.visible');
        // Removing Estimated Time
        cy.get('input[placeholder="Number"]')
            .eq(0)
            .clear()
            .should('have.value', '');
        cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        cy.get('[data-testid="board-list:backlog').should('be.visible')
        cy.get('[data-testid="list-issue"]')
            .first()
            .find('p')
            .click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('input[placeholder="Number"]')
            .eq(0)
            .should('have.value', '')
            .should('be.visible');
        cy.contains('No time logged').should('be.visible');
    });
    it('Log time and removing logged time', () => {
        // Loggin Time
        cy.get('input[placeholder="Number"]')
            //.eq(0)
            .type('7');
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.get('input[placeholder="Number"]')
            .eq(1)
            .type('2');
        cy.get('input[placeholder="Number"]')
            .eq(2)
            .type('5');
        cy.contains('button', 'Done')
            .click();
        cy.get('[data-testid="modal:tracking"]').should('not.exist');
        cy.contains('2h logged').should('be.visible');
        cy.contains('No time logged').should('not.exist');
        cy.contains('5h remaining').should('be.visible')
        cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        cy.get('[data-testid="board-list:backlog').should('be.visible')
        cy.get('[data-testid="list-issue"]')
            .first()
            .find('p')
            .click();
        cy.contains('2h logged').should('be.visible');
        cy.contains('No time logged').should('not.exist');
        cy.contains('5h remaining').should('be.visible');
        // Removing Logged Time
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.get('input[placeholder="Number"]')
            .eq(1)
            .clear();
        cy.get('input[placeholder="Number"]')
            .eq(2)
            .clear();
        cy.contains('button', 'Done')
            .click();
        cy.contains('2h logged').should('not.exist');
        cy.contains('5h remaining').should('not.exist');
        cy.contains('No time logged').should('be.visible');
        cy.get('[data-testid="icon:close"]')
            .first()
            .click()
        cy.get('[data-testid="board-list:backlog').should('be.visible')
        cy.get('[data-testid="list-issue"]')
            .first()
            .find('p')
            .click();
        cy.contains('2h logged').should('not.exist');
        cy.contains('5h remaining').should('not.exist');
        cy.contains('No time logged').should('be.visible');
    });
});











