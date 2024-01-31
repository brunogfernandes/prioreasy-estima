function Cadastro(nome, email, empresa, cargo, senha, csenha) {

    cy.get('#name').type(nome)
    cy.get('#email').type(email)
    cy.get('#company').type(empresa)
    cy.get('#role').select(cargo)
    cy.get('#password').type(senha)
    cy.get('#confirm_password').type(csenha)

    cy.contains('button', 'Concluir Cadastro').click()

}

describe('Teste de Analise Valor Limite - Cadastro', () => {

    //Tamanhos Superiores mais um, email, senha e nome falhando 

    beforeEach('Visitando página', () => {
        
        cy.visit("http://localhost:4200/signup");

    });
    it('CT23 - Nome Tamanho Limite Inferior Menos Um', () => {

        Cadastro('Aaaa', 'guizin@gmail.com', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT24 - Nome Tamanho Limite Inferior Igual', () => {

        Cadastro('Aaaaa', 'guizin@gmail.com', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')

        
    });

    it('CT25 - Nome Tamanho Limite Inferior Mais Um', () => {

        Cadastro('Aaaaaa', 'g@gmail.com', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')
        
    });

    it('CT26 - Nome Tamanho Limite Superior Menos Um', () => {

        Cadastro('Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'k@gmail.com', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')
        
    });

    it('CT27 - Nome Tamanho Limite Superior Igual', () => {

        Cadastro('Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'j@gmail.com', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')
        
    });

    it('CT28 - Nome Tamanho Limite Superior Mais Um', () => {

        Cadastro('Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'w@gmail.com', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')

        cy.validator('Máximo de 100 caracteres.')

    });

    it('CT29 - Email Tamnho Limite Inferior Menos Um', () => {

        Cadastro('Nome A', '@x.x', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT30 - Email Tamanho Limite Inferior Igual', () => {

        Cadastro('Nome A', 'x@x.x', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')
        
    });

    it('CT31 - Email Tamanho Limite Inferior Mais Um', () => {

        Cadastro('Nome A', 'xx@x.x', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')
        
    });

    it('CT32 - Email Tamanho Limite Superior Menos Um', () => {

        Cadastro('Nome A', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')
        
    });

    it('CT33 - Email Tamanho Limite Superior Igual', () => {

        Cadastro('Nome A', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')
        
    });

    it('CT34 - Email Tamanho Limite Superior Mais Um', () => {

        Cadastro('Nome A', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com', 'Empresa', 'Desenvolvedor', 'gui123#', 'gui123#')
        
        cy.validator('Máximo de 255 caracteres.')
    });

    it('CT35 - Empresa Tamanho Limite Inferior Menos Um', () => {

        Cadastro('Nome A', 'aaa@gmail.com', 'Empr', 'Desenvolvedor', 'gui123#', 'gui123#')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT36 - Empresa Tamanho Limite Inferior Igual', () => {

        Cadastro('Nome A', 'aa@gmail.com', 'Empre', 'Desenvolvedor', 'gui123#', 'gui123#')
        
    });

    it('CT37 - Empresa Tamanho Limite Inferior Mais UM', () => {

        Cadastro('Nome A', 'gh@gmail.com', 'Empres', 'Desenvolvedor', 'gui123#', 'gui123#')
        
    });

    it('CT38 - Empresa Tamanho Limite Superior Menos Um', () => {

        Cadastro('Nome A', 'ty@gmail.com', 'Empresaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'Desenvolvedor', 'gui123#', 'gui123#')
        
    });

    it('CT39 - Empresa Tamanho Limite Superior Igual', () => {

        Cadastro('Nome A', 'po@gmail.com', 'Empresaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'Desenvolvedor', 'gui123#', 'gui123#')
        
    });

    it('CT40 - Empresa Tamanho Limite Superior Mais Um', () => {

        Cadastro('Nome A', 'tu@gmail.com', 'Empresaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'Desenvolvedor', 'gui123#', 'gui123#')

        cy.validator('Máximo de 30 caracteres.')
        
    });

    it('CT41 - Senha Tamanho Limite Inferior Menos Um', () => {

        Cadastro('Nome A', 'qw@gmail.com', 'Empresa', 'Desenvolvedor', '12a#', '12a#')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT42 - Senha Tamanho Limite Inferior Igual', () => {

        Cadastro('Nome A', 'er@gmail.com', 'Empresa', 'Desenvolvedor', '12a#3', '12a#3')
        
    });

    it('CT43 - Senha Tamanho Limmite Inferior Mais Um', () => {

        Cadastro('Nome A', 'fh@gmail.com', 'Empresa', 'Desenvolvedor', '12a#34', '12a#34')
        
    });

    it('CT44 - Senha Tamanho Limite Superior Menos Um', () => {

        Cadastro('Nome A', 'ad@gmail.com', 'Empresa', 'Desenvolvedor', '123456789012345678901234567a#', '123456789012345678901234567a#')
        
    });

    it('CT45 - Senha Tamanho Limite Superior Igual', () => {

        Cadastro('Nome A', 'te@gmail.com', 'Empresa', 'Desenvolvedor', '123456789012345678901234567a#0', '123456789012345678901234567a#0')
        
    });

    it('CT46 - Senha Tamanho Limite Superior Mais Um', () => {

        Cadastro('Nome A', 'ad@gmail.com', 'Empresa', 'Desenvolvedor', '123456789012345678901234567a#01', '123456789012345678901234567a#01')
        
        cy.validator('Máximo de 25 caracteres.')
    });
});