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
    const ORIGINALESTIMATEFIELD = () => cy.get('input[placeholder="Number"]').eq(0)
    const ClosePage = () => cy.get('[data-testid="icon:close"]').first().click();
    const BoardListBacklog = () => cy.get('[data-testid="board-list:backlog').should('be.visible')
    const FirstIssuePopUp = () => cy.get('[data-testid="list-issue"]').first().find('p').click();
    const IssueDetailView = () => cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    const TimeSpentField = () => cy.get('input[placeholder="Number"]').eq(1)
    const TimeRemainingField = () => cy.get('input[placeholder="Number"]').eq(2)
    const TimeTrackingModal = () => cy.get('[data-testid="modal:tracking"]')

    it('ADD Update and Removing Estimated Time', () => {
        // Adding Estimated Time
        cy.contains('No time logged').should('be.visible')
        ORIGINALESTIMATEFIELD().type('10');
        cy.contains('10h estimated').should('be.visible');
        ClosePage()
        BoardListBacklog()
        FirstIssuePopUp()
        IssueDetailView()
        ORIGINALESTIMATEFIELD().should('have.value', '10');
        cy.contains('10h estimated').should('be.visible')
        // Updating Estimated Time
        ORIGINALESTIMATEFIELD().clear().type('20').should('have.value', '20');
        cy.contains('20h estimated').should('be.visible');
        ClosePage()
        BoardListBacklog()
        FirstIssuePopUp()
        IssueDetailView()
        ORIGINALESTIMATEFIELD().should('have.value', '20');
        cy.contains('20h estimated').should('be.visible');
        // Removing Estimated Time
        ORIGINALESTIMATEFIELD().clear().should('have.value', '');
        ClosePage()
        BoardListBacklog()
        FirstIssuePopUp()
        IssueDetailView()
        ORIGINALESTIMATEFIELD().should('have.value', '').should('be.visible');
        cy.contains('No time logged').should('be.visible');
    });
    it('Log time and removing logged time', () => {

        // Loggin Time

        ORIGINALESTIMATEFIELD().type('7');
        cy.get('[data-testid="icon:stopwatch"]').click();
        TimeTrackingModal().should('be.visible');
        TimeSpentField().type('2');
        TimeRemainingField().type('5');
        cy.contains('button', 'Done').click();
        TimeTrackingModal().should('not.exist');
        cy.contains('2h logged').should('be.visible');
        cy.contains('No time logged').should('not.exist');
        cy.contains('5h remaining').should('be.visible')
        ClosePage()
        BoardListBacklog()
        FirstIssuePopUp()
        cy.contains('2h logged').should('be.visible');
        cy.contains('No time logged').should('not.exist');
        cy.contains('5h remaining').should('be.visible');

        // Removing Logged Time

        ORIGINALESTIMATEFIELD().clear();
        cy.get('[data-testid="icon:stopwatch"]').click();
        TimeTrackingModal().should('be.visible');
        TimeSpentField().clear();
        TimeRemainingField().clear();
        cy.contains('button', 'Done').click();
        cy.contains('2h logged').should('not.exist');
        cy.contains('5h remaining').should('not.exist');
        cy.contains('No time logged').should('be.visible');
        ClosePage()
        BoardListBacklog()
        FirstIssuePopUp()
        cy.contains('2h logged').should('not.exist');
        cy.contains('5h remaining').should('not.exist');
        cy.contains('No time logged').should('be.visible');
    });
});











