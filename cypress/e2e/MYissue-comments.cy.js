describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should create,edit and delete comment successfully', () => {
        const Mycomment = 'Mohamed comment'
        const Comments = '[data-testid="issue-comment"]'
        const NewComment = 'Edited Mohamed comment '
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...').click();
            cy.get('textarea[placeholder="Add a comment..."]').type(Mycomment);
            cy.contains('button', 'Save').click().should('not.exist');
            cy.contains('Add a comment...').should('exist');
            cy.get(Comments).should('contain', Mycomment);
            //Editing the comment already added
            cy.get(Comments)
                .first()
                .contains('Edit')
                .click().should('not.exist');
            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', Mycomment)
                .clear()
                .type(NewComment);
            cy.contains('button', 'Save').click().should('not.exist');
            cy.get(Comments).should('contain', 'Edit')
                .and('contain', NewComment);
            // Deleting the Comment
            cy.get(Comments)
                .contains('Delete')
                .click();
        })
        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');
        getIssueDetailsModal().find(NewComment).should('not.exist')

    });

    it('Should create a comment and cancel it', () => {
        const Mycomment = 'Mohamed comment'
        const Comments = '[data-testid="issue-comment"]'
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...').click();
            cy.get('textarea[placeholder="Add a comment..."]').type(Mycomment);
            cy.contains('button', 'Cancel').click().should('not.exist');
            cy.contains('Add a comment...').should('exist');
            cy.get(Comments).should('not.contain', Mycomment);
        });

    });
    const Comments = '[data-testid="issue-comment"]'
    it('Should cancel Deleting a comment', () => {
        getIssueDetailsModal()
            .find(Comments)
            .contains('Delete')
            .click();
        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Cancel')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find(Comments)
            .contains('An old silent pond...')
            .should('exist');
    })
})


