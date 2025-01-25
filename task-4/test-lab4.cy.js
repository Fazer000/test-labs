import 'cypress-file-upload';

describe('template spec', () => {
    beforeEach(() => {
        cy.visit('https://burnitalldown.ru');

        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error(err);
            return false;
        });
    });

    it('Успешная отправка формы', () => {
        cy.get('[data-cy=mainFormOpenButton]').click();
        cy.get('input[name="signUpClassesFormFullName"]').type('Иванов Иван Иванович', {force: true});
        cy.get('input[name="signUpClassesFormAge"]').type('25', {force: true});
        cy.get('select[name="signUpClassesFormLearningExperience"]').select('1 год+');

        cy.get('input[name="days[]"][value="Понедельник"]').check({force: true});
        cy.get('input[name="days[]"][value="Среда"]').check({force: true});
        cy.get('input[name="days[]"][value="Пятница"]').check({force: true});

        cy.get('input[name="signUpClassesFormContacts"]').type('+79161234567', {force: true});
        cy.get('select[name="signUpClassesFormContactsSelect"]').select('WhatsApp', {force: true});

        cy.get('button[name="signUpClassesFormSubmit"]').click();

        cy.get('.modal-message-block', { timeout: 10000 }).should('have.class', 'open');
        cy.get('.modal-message-block p').should('contain', 'Заявка отправлена!');
    });

    it('Проверка обязательных полей', () => {
        cy.get('form#signUpClassesForm').submit({force: true});

        cy.get('input[name="signUpClassesFormFullName"]:invalid').should('exist', {force: true});
        cy.get('input[name="signUpClassesFormAge"]:invalid').should('exist', {force: true});
        cy.get('select[name="signUpClassesFormLearningExperience"]:invalid').should('exist', {force: true});
        cy.get('input[name="signUpClassesFormContacts"]:invalid').should('exist', {force: true});
        cy.get('select[name="signUpClassesFormContactsSelect"]:invalid').should('exist', {force: true});
    });

    it('Смена аватара учетной записи', () => {
        cy.visit('https://burnitalldown.ru/login');

        cy.get('input[name="email"]').type('test@mail.ru', {force: true});
        cy.get('input[name="password"]').type('qwe123', {force: true});
        cy.get('[data-cy=loginSubmitTest]').click({force: true});
        cy.get('[data-cy=updateAvatarTest]').click({force: true})
        cy.get('#cropperInputImage').attachFile('test-image.jpg');

        cy.get('.cropper-container').should('be.visible');

        cy.get('.cropper-container').scrollIntoView()
            .trigger('mousedown', { which: 1, pageX: 100, pageY: 100, force: true })
            .trigger('mousemove', { which: 1, pageX: 300, pageY: 300, force: true })
            .trigger('mouseup', { force: true });

        cy.get('[data-cy=saveAvatarButton]').click();
    });

    it('Добавление занятия', () => {

        cy.visit('https://burnitalldown.ru/admin-panel/admin-login.php');

        cy.get('[data-cy=loginEmailTest]', { timeout: 10000 })
            .should('be.visible').type('u2962774_admin', {force: true});
        cy.get('[data-cy=loginPassTest]', { timeout: 10000 })
            .should('be.visible').type('F5S-yDc-iXd-ZHe', {force: true});
        cy.get('[data-cy=loginSubmitTest]').click({force: true});

        cy.visit('https://burnitalldown.ru/admin-panel/admin-panel.php#schedule-editor');

        cy.get('#scheduleTable table tbody tr')
            .eq(3)
            .find('td')
            .eq(1)
            .click({force: true});   

        cy.get('#lessonTime')
            .select('10:15');

        cy.get('#lessonDuration')
            .select('45 минут');

        cy.get('[data-test=openScheduleUserSelect]').click()
        cy.get('[data-test=selectUserSchedule]').eq(0).click();
        cy.get('[data-test=submitScheduleForm]').click();

    });
  
    it('Добавления пользователя', () => {
        cy.visit('https://burnitalldown.ru/admin-panel/admin-login.php');

        cy.get('[data-cy=loginEmailTest]', { timeout: 10000 })
            .should('be.visible').type('u2962774_admin', {force: true});
        cy.get('[data-cy=loginPassTest]', { timeout: 10000 })
            .should('be.visible').type('F5S-yDc-iXd-ZHe', {force: true});
        cy.get('[data-cy=loginSubmitTest]').click({force: true});

        cy.visit('https://burnitalldown.ru/admin-panel/admin-panel.php#users');

        cy.get('[data-test=createUserEmail]').type('testuser123@gmail.com');
        cy.get('[data-test=createUserPassword]').type('123456');
        cy.get('[data-test=createUserFirstName]').type('UserFirtsName');
        cy.get('[data-test=createUserLastName]').type('UserLastName');
        cy.get('[data-test=createUserSubmit]').click();

        cy.get('[data-test=successMessage]')
            .should('be.visible')
            .and('contain', 'Ученик зарегистрирован');

        cy.get('[data-test=deleteUser]').eq(9).click();
    });

    it('Добавление достижений', () => {
        cy.visit('https://burnitalldown.ru/admin-panel/admin-login.php');

        cy.get('[data-cy=loginEmailTest]', { timeout: 10000 })
           .should('be.visible').type('u2962774_admin', {force: true});
        cy.get('[data-cy=loginPassTest]', { timeout: 10000 })
            .should('be.visible').type('F5S-yDc-iXd-ZHe', {force: true});
        cy.get('[data-cy=loginSubmitTest]').click({force: true});

        cy.visit('https://burnitalldown.ru/admin-panel/admin-panel.php#achievements-editor');

        cy.get('[data-test=achievementName]').type('TestAchievement');
        cy.get('[data-test=achievementImage]').attachFile('test-image.jpg');
        cy.get('[data-test=achievementSubmit]').click();

        cy.get('[data-test=successMessage]')
            .should('be.visible')
            .and('contain', 'Достижение успешно добавлено!');

        cy.get('[data-test=achievementDelete]').last().click();
    });
});
