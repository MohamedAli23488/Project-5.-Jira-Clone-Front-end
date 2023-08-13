import Selectors,{NewIssue,variables} from "../pages/New issue and selectors";

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
        Selectors.ORIGINALESTIMATEFIELD().type(variables.estimatedtime);
        cy.contains(`${variables.estimatedtime}${variables.estimatedHoursText}`).should('be.visible');
        Selectors.ClosePage()
        Selectors.BoardListBacklog()
        Selectors.FirstIssuePopUp()
        Selectors.IssueDetailView()
        Selectors.ORIGINALESTIMATEFIELD().should('have.value', variables.estimatedtime);
        cy.contains(`${variables.estimatedtime}${variables.estimatedHoursText}`).should('be.visible')
        // Updating Estimated Time
        Selectors.ORIGINALESTIMATEFIELD().clear().type(variables.editedEstimatedtime).should('have.value', variables.editedEstimatedtime);
        cy.contains(`${variables.editedEstimatedtime}${variables.estimatedHoursText}`).should('be.visible');
        Selectors.ClosePage()
        Selectors.BoardListBacklog()
        Selectors.FirstIssuePopUp()
        Selectors.IssueDetailView()
        Selectors.ORIGINALESTIMATEFIELD().should('have.value', variables.editedEstimatedtime);
        cy.contains(`${variables.editedEstimatedtime}${variables.estimatedHoursText}`).should('be.visible');
        // Removing Estimated Time
        Selectors.ORIGINALESTIMATEFIELD().clear().should('have.value', '');
        Selectors.ClosePage()
        Selectors.BoardListBacklog()
        Selectors.FirstIssuePopUp()
        Selectors.IssueDetailView()
        Selectors.ORIGINALESTIMATEFIELD().should('have.value', '').should('be.visible');
        cy.contains('No time logged').should('be.visible');
    });
    it('Log time and removing logged time', () => {

        // Loggin Time

        Selectors.ORIGINALESTIMATEFIELD().type('7');
        cy.get('[data-testid="icon:stopwatch"]').click();
        Selectors.TimeTrackingModal().should('be.visible');
        Selectors.TimeSpentField().type('2');
        Selectors.TimeRemainingField().type('5');
        cy.contains('button', 'Done').click();
        Selectors.TimeTrackingModal().should('not.exist');
        cy.contains('2h logged').should('be.visible');
        cy.contains('No time logged').should('not.exist');
        cy.contains('5h remaining').should('be.visible')
        Selectors.ClosePage()
        Selectors.BoardListBacklog()
        Selectors.FirstIssuePopUp()
        cy.contains('2h logged').should('be.visible');
        cy.contains('No time logged').should('not.exist');
        cy.contains('5h remaining').should('be.visible');

        // Removing Logged Time

        Selectors.ORIGINALESTIMATEFIELD().clear();
        cy.get('[data-testid="icon:stopwatch"]').click();
        Selectors.TimeTrackingModal().should('be.visible');
        Selectors.TimeSpentField().clear();
        Selectors.TimeRemainingField().clear();
        cy.contains('button', 'Done').click();
        cy.contains('2h logged').should('not.exist');
        cy.contains('5h remaining').should('not.exist');
        cy.contains('No time logged').should('be.visible');
        Selectors.ClosePage()
        Selectors.BoardListBacklog()
        Selectors.FirstIssuePopUp()
        cy.contains('2h logged').should('not.exist');
        cy.contains('5h remaining').should('not.exist');
        cy.contains('No time logged').should('be.visible');
    });
});











