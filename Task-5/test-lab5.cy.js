describe('template spec', () => {
    beforeEach(() => {
        cy.visit(`https://burnitalldown.ru`);
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error(err);
            return false;
        });
    });

    it('Добавления пользователя с проверками', () => {
        cy.visit('https://burnitalldown.ru/admin-panel/admin-login.php');

        cy.get('[data-cy=loginEmailTest]', { timeout: 10000 })
            .should('be.visible').type('u2962774_admin', {force: true});
        cy.get('[data-cy=loginPassTest]', { timeout: 10000 })
            .should('be.visible').type('F5S-yDc-iXd-ZHe', {force: true});
        cy.get('[data-cy=loginSubmitTest]').click({force: true});

        cy.visit('https://burnitalldown.ru/admin-panel/admin-panel.php#users');

        const email = `testuser${Date.now()}@gmail.com`;
        const password = '123456';
        const firstName = 'UserFirstName';
        const lastName = 'UserLastName';

        cy.get('[data-test=createUserEmail]').type(email, {force: true});
        cy.get('[data-test=createUserPassword]').type(password, {force: true});
        cy.get('[data-test=createUserFirstName]').type(firstName, {force: true});
        cy.get('[data-test=createUserLastName]').type(lastName, {force: true});
        cy.get('[data-test=createUserSubmit]').click({force: true});

        cy.get('[data-test=successMessage]')
            .should('be.visible')
            .and('contain', 'Ученик зарегистрирован');

        cy.get('[data-test=deleteUser]').eq(9).click();

        cy.get('[data-test=successMessage]')
            .should('be.visible')
            .and('contain', 'Пользователь удален');
    });

    it('Тест скорости загрузки страницы', () => {
        const startTime = performance.now();
        cy.visit(`https://burnitalldown.ru/index?t=${Date.now()}`);
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        expect(loadTime).to.be.lessThan(1000);
    });

    it('Тест защиты от XSS атак', () => {
        cy.get('[data-cy=mainFormOpenButton]').click({force: true});
        const xssPayload = '<script>alert("XSS Attack")</script>';

        cy.get('input[name="signUpClassesFormFullName"]').type(xssPayload, {force: true});
        cy.get('input[name="signUpClassesFormAge"]').type('25', {force: true});
        cy.get('select[name="signUpClassesFormLearningExperience"]').select('1 год+');

        cy.get('input[name="days[]"][value="Понедельник"]').check({force: true});
        cy.get('input[name="days[]"][value="Среда"]').check({force: true});
        cy.get('input[name="days[]"][value="Пятница"]').check({force: true});

        cy.get('input[name="signUpClassesFormContacts"]').type('+79161234567', {force: true});
        cy.get('select[name="signUpClassesFormContactsSelect"]').select('WhatsApp', {force: true});

        cy.get('button[name="signUpClassesFormSubmit"]').click({force: true});

        cy.on('window:alert', (str) => {
        expect(str).to.not.equal('XSS Attack');
        });
    });
});
