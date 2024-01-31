function InserirAtor(nome, complexidade, desc) {

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

    it('CT00 - Nome Ator Limite Inferior Menos Um', () => {

        InserirAtor('Ator', 'Simples', 'Descrição')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT00 - Nome Ator Limite Inferior Igual', () => {
        
        InserirAtor('Atorr', 'Simples', 'Descrição')

    });

    it('CT00 - Nome Ator Limite Inferior Mais Um', () => {
        
        InserirAtor('Atorrr', 'Simples', 'Descrição')

    });

    it('CT00 - Nome Ator Limite Superior Menos Um', () => {
        
        InserirAtor('Atorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', 'Simples', 'Descrição')

    });

    it('CT00 - Nome Ator Limite Superior Igual', () => {
        
        InserirAtor('Atorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', 'Simples', 'Descrição')

    });

    it('CT00 - Nome Ator Limite Superior Mais um', () => {
        
        InserirAtor('Atorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', 'Simples', 'Descrição')

        cy.validator('Máximo de 100 caracteres.')

    });

    it('CT00 - Descrição Ator Limite Inferior Menos Um', () => {
        
        InserirAtor('Nome Ator', 'Simples', 'Desc')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 - Descrição Ator Limite Inferior Igual', () => {
        
        InserirAtor('Nome Ator', 'Simples', 'Descr')

    });

    it('CT00 - Descrição Ator Limite Inferior Mais Um', () => {

        InserirAtor('Nome Ator', 'Simples', 'Descri')
        
    });

    it('CT00 - Descrição Ator Limite Superior Menos Um', () => {

        InserirAtor('Nome Ator', 'Simples', 'Descriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
        
    });

    it('CT00 - Descrição Ator Limite Superior Igual', () => {
        
        InserirAtor('Nome Ator', 'Simples', 'Descriçãooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')

    });

    it('CT00 - Descrição Ator Limite Superior Mais Um', () => {
        
        InserirAtor('Nome Ator', 'Simples', 'Descriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')

        cy.validator('Máximo de 255 caracteres.')
    });

});