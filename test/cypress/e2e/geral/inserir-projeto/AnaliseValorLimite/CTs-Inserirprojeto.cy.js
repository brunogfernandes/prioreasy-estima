function InserirProjeto(nome,desc,empre,status,dataIni,dataFim){

    cy.get('#name').type(nome)
    cy.get('#descricao').type(desc)
    cy.get('#empresa').type(empre)
    cy.get('#status').select(status)
    cy.get('#dataInicio').type(dataIni)
    cy.get('#previsaoFim').type(dataFim)

    cy.contains('button', 'Concluir Cadastro').click()

}

describe('Teste de Cenários - Inserir Projeto', () => {
    
    beforeEach('Realiando login', () => {

        cy.login()
        cy.visit('http://localhost:4200/dashboard/projetos')
        cy.get('.justify-between > .rounded-md').click()
        
    });

    it('CT00 - Nome Limite Inferior Menos Um', () => {

        InserirProjeto('Proj', 'Descrição', 'Empresa', 'Em andamento', '2023-12-11', '2024-12-11')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT00 - Nome Limite Inferior Igual', () => {

        InserirProjeto('Proje', 'Descrição', 'Empresa', 'Em andamento', '2023-12-11', '2024-12-11')
        
    });

    it('CT00 - Nome Limite Inferior Mais Um', () => {

        InserirProjeto('Projet', 'Descrição', 'Empresa', 'Em andamento', '2023-12-11', '2024-12-11')
        
    });

    it('CT00 - Nome Limite Superior Menos Um', () => {

        InserirProjeto('Projetooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Descrição', 'Empresa', 'Em andamento', '2023-12-11', '2024-12-11')
        
    });

    it('CT00 - Nome Limite Superior Igual', () => {

        InserirProjeto('Projetoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Descrição', 'Empresa', 'Em andamento', '2023-12-11', '2024-12-11')
        
    });

    it('CT00 - Nome Limite Superior Mais Um', () => {

        InserirProjeto('Projetooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Descrição', 'Empresa', 'Em andamento', '2023-12-11', '2024-12-11')
        
        cy.validator('Máximo de 100 caracteres.')
    });

    it('CT00 - Descrição Limite Inferior Menos Um', () => {

        InserirProjeto('Projeto', 'Desc', 'Empresa', 'Em andamento', '2023-12-20', '2024-12-20')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT00 - Descrição Limite Inferior Igual', () => {

        InserirProjeto('Projeto', 'Descr', 'Empresa', 'Em andamento', '2023-12-20', '2024-12-20')
        
    });

    it('CT00 - Descrição Limite Inferior Mais Um', () => {

        InserirProjeto('Projeto', 'Descri', 'Empresa', 'Em andamento', '2023-12-20', '2024-12-20')
        
    });

    it('CT00 - Descrição Limite Superior Menos Um', () => {

        InserirProjeto('Projeto', 'Descriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Empresa', 'Em andamento', '2023-12-20', '2024-12-20')
        
    });

    it('CT00 - Descrição Limite Superior Igual', () => {

        InserirProjeto('Projeto', 'Descriçãooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Empresa', 'Em andamento', '2023-12-20', '2024-12-20')
        
    });

    it('CT00 - Descrição Limite Superior Mais Um', () => {

        InserirProjeto('Projeto', 'Descriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Empresa', 'Em andamento', '2023-12-20', '2024-12-20')
        
    });

    it('CT00 - Empresa Limite Inferior Menos Um', () => {

        InserirProjeto('Projeto', 'Descrição', 'Empr', 'Em andamento', '2023-12-20', '2024-12-20')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT00 - Empresa Limite Inferior Igual', () => {

        InserirProjeto('Projeto', 'Descrição', 'Empre', 'Em andamento', '2023-12-20', '2024-12-20')
        
    });
    
    it('CT00 - Empresa Limite Interior Mais Um', () => {
        
        InserirProjeto('Projeto', 'Descrição', 'Empres', 'Em andamento', '2023-12-20', '2024-12-20')

    });

    it('CT00 - Empresa Limite Superior Menos Um', () => {

        InserirProjeto('Projeto', 'Descrição', 'Empresaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'Em andamento', '2023-12-20', '2024-12-20')

    });

    it('CT00 - Empresa Limite Superior Igual', () => {

        InserirProjeto('Projeto', 'Descrição', 'Empresaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'Em andamento', '2023-12-20', '2024-12-20')

    });

    it('CT00 - Empresa Limite Superior Mais Um', () => {

        InserirProjeto('Projeto', 'Descrição', 'Empresaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'Em andamento', '2023-12-20', '2024-12-20')

        cy.validator('Máximo de 100 caracteres.')

    });   

});