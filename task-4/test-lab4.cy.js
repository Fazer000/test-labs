import 'cypress-file-upload';

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com');
  });

  it('Переход к разделу "Элементы"', () => {
    cy.get('.avatar.mx-auto.white').eq(0).click();
    cy.get('.btn.btn-light#item-3').eq(0).click();
    cy.contains('.btn.btn-primary', 'Add').click();

    cy.get('.mr-sm-2.form-control#firstName').type("Sergei", {force: true});
    cy.get('.mr-sm-2.form-control#lastName').type("Eltsov", {force: true});
    cy.get('.mr-sm-2.form-control#userEmail').type("test-mail@mail.com", {force: true});
    cy.get('.mr-sm-2.form-control#age').type("20", {force: true});
    cy.get('.mr-sm-2.form-control#salary').type("5000", {force: true});
    cy.get('.mr-sm-2.form-control#department').scrollIntoView().type("XZ", {force: true});
    cy.contains('.btn.btn-primary', 'Submit').click({force: true});

    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();

    const expectedData = [
      { firstName: 'Sergei', lastName: 'Eltsov', email: 'test-mail@mail.com', age: '20', salary: '5000', department: 'XZ' },
    ];

    expectedData.forEach((data, index) => {
        cy.get('div.rt-tbody').find('div.rt-tr').eq(index).within(() => {
            cy.get('div.rt-td').eq(0).should('have.text', data.firstName);
            cy.get('div.rt-td').eq(1).should('have.text', data.lastName);
            cy.get('div.rt-td').eq(2).should('have.text', data.age);
            cy.get('div.rt-td').eq(3).should('have.text', data.email);
            cy.get('div.rt-td').eq(4).should('have.text', data.salary);
            cy.get('div.rt-td').eq(5).should('have.text', data.department);
        });
    });
  });

  it ('Тест 2', () => {
    const fileName = '/ttt.PNG';

    cy.get('.avatar.mx-auto.white').eq(0).click();
    cy.get('.header-wrapper').eq(1).click();
    cy.get('.element-list.collapse.show').click();

    cy.get('.mr-sm-2.form-control#firstName').type("Sergei", {force: true});
    cy.get('.mr-sm-2.form-control#lastName').type("Sergei", {force: true});
    cy.get('.mr-sm-2.form-control#userEmail').type("Sergei", {force: true});
    cy.get('.mr-sm-2.form-control#lastName').type("Sergei", {force: true});
    cy.get('.custom-control-input#gender-radio-1').click({force: true});
    cy.get('.mr-sm-2.form-control#userNumber').type("Sergei", {force: true});
    cy.get('.form-control#dateOfBirthInput').type("11 Oct 2024", {force: true});
    cy.get('.custom-control-input#hobbies-checkbox-1').click({force: true});
    cy.get('.custom-control-input#hobbies-checkbox-3').click({force: true});

    cy.get('input[type="file"]')
      .attachFile(fileName);

    cy.get('.form-control#currentAddress').type("TEST", {force: true});
    cy.get('button#submit.btn.btn-primary').click({force: true});
  });

  it('Тест 3', () => {
    
  });

});
