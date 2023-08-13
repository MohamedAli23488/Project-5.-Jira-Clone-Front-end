export function NewIssue() {
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

const ORIGINALESTIMATEFIELD = () => cy.get('input[placeholder="Number"]').eq(0)
const ClosePage = () => cy.get('[data-testid="icon:close"]').first().click();
const BoardListBacklog = () => cy.get('[data-testid="board-list:backlog').should('be.visible')
const FirstIssuePopUp = () => cy.get('[data-testid="list-issue"]').first().find('p').click();
const IssueDetailView = () => cy.get('[data-testid="modal:issue-details"]').should('be.visible');
const TimeSpentField = () => cy.get('input[placeholder="Number"]').eq(1)
const TimeRemainingField = () => cy.get('input[placeholder="Number"]').eq(2)
const TimeTrackingModal = () => cy.get('[data-testid="modal:tracking"]')
const Selectors = {
    ORIGINALESTIMATEFIELD,
    ClosePage,
    BoardListBacklog,
    FirstIssuePopUp,
    IssueDetailView,
    TimeSpentField,
    TimeRemainingField,
    TimeTrackingModal,
}
export default Selectors;

export const variables = {
    estimatedtime: 10,
    estimatedHoursText: 'h estimated',
    editedEstimatedtime: 20,
};
