function InserirAtor(nome, complexidade, desc){

    cy.get('#nome').type(nome)
    cy.get('#complexidade').select(complexidade)
    cy.get('#descricao').type(desc)

    cy.contains('button', 'Concluir Cadastro').click()

}


describe('Teste de Cenários - Inserir Ator', () => {
    it('Visitando o dashboard dos Atores', () => {
        
        cy.login()
        cy.visit('http://localhost:4200/dashboard/projetos')
        cy.get(':nth-child(5) > .justify-center > :nth-child(1)').click()
        cy.get(':nth-child(2) > .inline-flex').click()
        cy.get(':nth-child(3) > .p-4').click()

    });

    beforeEach('Visitando direto o dasboard atores', () => {
        
        cy.login()
        cy.visit('http://localhost:4200/dashboard/projeto/8/atores')
        cy.contains('button', 'Inserir Novo').click()

    });

    it('CT00 - Cadastro Ator com sucesso', () => {

        InserirAtor('Cadastro Ator', 'Simples', 'Descrição')
        
    });

    it('CT00 - Cadastro Ator sem sucesso, campo preenchido incorretamente', () => {

        InserirAtor('A', 'Simples', 'Descrição')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT00 - Cadastro de Ator campos sem preencher', () => {

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')
        
    });

});