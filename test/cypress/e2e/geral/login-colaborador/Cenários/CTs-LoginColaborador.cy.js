function Login(login, senha){

    cy.get('#email').type(login)
    cy.get('#password').type(senha)

    cy.contains('button', 'Efetuar Login').click()

}

describe('Teste de Cenários - Login Colaborador', () => {


    beforeEach('Visitando página de login', () => {

        cy.visit('http://localhost:4200/collaborator-signin')
        
    });
    it('', () => {
        
    });
    /*
    it('CT00 - Login com sucesso', () => {
        
        //Sucesso
        Login('teste@gmail.com', 'teste123@')

    });

    it('CT00 - Login com falha, email não cadastrado', () => {

        //Sucesso

        Login('teste1@gmail.com', 'teste123@')
        cy.wait(10000)

        cy.on('window:alert', (message) => {
            expect(message).to.equal('O Colaborador não foi encontrado na base de dados!');
        });
        
    });

    it('CT00 - Login com falha, senha incorreta', () => {

        Login('teste@gmail.com', 'teste12345@')

        cy.on('window:alert', (message) => {
            expect(message).to.equal('Senha incorreta!');
        });
        
    });
    
    it('CT00 - Login sem preencher os campos', () => {

        //Falha

        cy.contains('button', 'Efetuar Login')

        cy.validator('Campo obrigatório.')
        
    });
    */
});