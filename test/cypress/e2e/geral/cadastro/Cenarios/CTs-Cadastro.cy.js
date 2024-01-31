function Cadastro(nome, email, empresa, cargo, senha, csenha){

    cy.get('#name').type(nome)
    cy.get('#email').type(email)
    cy.get('#company').type(empresa)
    cy.get('#role').select(cargo)
    cy.get('#password').type(senha)
    cy.get('#confirm_password').type(csenha)

}

describe('Teste de Cenários - Cadastro', () => {

    beforeEach('Visitando página', () => {

        cy.visit("http://localhost:4200/signup");
        
    });
    it('CT01 - Cadastro com sucesso', () => {
        
        //Sucesso
        Cadastro('Jack Frosr', 'jackfrost@gmail.com', 'Frost LTDA', 'Desenvolvedor', 'jack123@', 'jack123@')
        cy.contains('button', 'Concluir Cadastro').click()

    });

    it('CT02 - Cadastro sem sucesso', () => {

        //Sucesso
        cy.get('#name').type('Jack Frost Segundo')
        cy.get('#email').type('jackfrost1@gmail.com')
        cy.get('#company').type('Frost LTDA')
        cy.get('#role').select('Desenvolvedor')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')
                
    });

    it('CT03 - Email ja cadastrado', () => {
        
        Cadastro('Jack Frost Terceiro', 'jackfrost@gmail.com', 'Frost LTDA', 'Desenvolverdor', 'frost123#', 'frost123#')
        cy.contains('button', 'Concluir Cadastro').click()

    });

    it.only('CT04 - Senha e Confirmar senha diferentes', () => {

        //Sucesso
        Cadastro('Jack Frost Quarto', 'jackfrost3@gmail.com','Frost LTDA', 'Desenvolvedor', 'frost1234#', 'frost123#')
        cy.contains('button', 'Concluir Cadastro').click()
    })
});