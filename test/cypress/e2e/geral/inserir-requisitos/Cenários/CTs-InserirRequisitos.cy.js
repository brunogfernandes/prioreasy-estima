function InserirRequisito( num, nome, espec){

    cy.get('#numeroIdentificador').type(num)
    cy.get('#name').type(nome)
    cy.get('#especificacao').type(espec)

    cy.contains('button', 'Concluir Cadastro').click()
}


describe('Teste de Cenários - Inserir Requisito', () => {

    it('Testanto o caminho para chegar até Requisitos', () => {
        
        //Sucesso
        cy.login()
        cy.visit('http://localhost:4200/dashboard/projetos')
        cy.get(':nth-child(5) > .justify-center > :nth-child(1)').click()
        cy.contains('Requisitos Funcionais').click()


    });
    // Otimizandoo o código para ir direto pro Dashboard de colabores, 
    // facilitando os testes de adição de colaborades
    
    beforeEach('Visitando Direto Dashboard Colaboradores', () => {
        
        cy.login()
        cy.wait(4000)
        cy.visit('http://localhost:4200/dashboard/projeto/8/requisitos')
        cy.contains('button','Inserir Novo').click()

    });
    
    it('CT00 - Cadastro de Requisito com sucesso', () => {

        InserirRequisito(1, 'Cadastro de Requisitos', 'Especificação')
        
    });
    
    it('CT00 - Cadastro inválido, campo preenchido incorretamente', () => {
        
        InserirRequisito(1, 'C', 'Especificação')

        cy.validator('Mínimo de 5 caracteres')

    });

    it('CT00 - Campos obribatórios sem preencher', () => {
        
        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')
    });

});