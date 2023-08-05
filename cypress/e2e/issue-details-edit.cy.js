describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
        .trigger('mouseover')
        .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
    });
  });

  it('Should update title, description successfully', () => {
    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get('.ql-snow')
        .click()
        .should('not.exist');

      cy.get('.ql-editor').clear().type(description);

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
      cy.get('.ql-snow').should('have.text', description);
    });
  });
  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

  // ASSIGNMENT 3: SOLVE JAVASCRIPT TASKS (BONUS) 
  // Task 1
  it.only('Checking PRIORITY Dropdown List and  validates values in issue priorities', () => {
    const expectedLength = 5;
    const PriorityList = [];
    const Priorities = '.sc-cpmLhU.bAPjBE'
    const PrioritySelector = '[data-testid="select:priority"]'

    cy.get(PrioritySelector).contains('High')
      .invoke("text").then((text) => {
        PriorityList.push(text.trim());
        cy.log(PriorityList);
        cy.get(PrioritySelector)
          .click()
          .next()
          .find(Priorities)
          .each((priority) => {
            cy.wrap(priority)
              .invoke('text')
              .then((text) => {
                PriorityList.push(text.trim());
              });
          })
          .then(() => {
            cy.log('Added values to PriorityList:', PriorityList);
            cy.log('Length of PriorityList:', PriorityList.length);
            cy.log(PriorityList.length === expectedLength)
          })
      });
  })

  // ASSIGNMENT 3: SOLVE JAVASCRIPT TASKS (BONUS)
  // Task 2
  it.only('checking that reporter name has only characters in it and ', () => {
    const ReporterList = [];
    const ReporterSelector = '[data-testid="select:reporter"]'
    const Reporters = '.sc-eerKOB.bIUyqH'
    const Regex = /^[A-Za-z ]+$/;

    cy.get(ReporterSelector).contains('Baby Yoda')
      .invoke("text").then((text) => {
        ReporterList.push(text.trim());
        cy.log(ReporterList);
        cy.get(ReporterSelector)
          .click()
          .next()
          .find(Reporters)
          .each((Reporter) => {
            cy.wrap(Reporter)
              .invoke('text')
              .then((text) => {
                ReporterList.push(text.trim());
              });
          })
          .then(() => {
            cy.log(ReporterList)
            ReporterList.forEach((ReporterName) => {
              cy.wrap(ReporterName).should('match', Regex)
            });
          })
      });
  })
})





