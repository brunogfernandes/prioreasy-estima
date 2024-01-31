-- Inserting a Collaborator
INSERT INTO COLABORADORES (COL_NOME, COL_EMAIL, COL_SENHA, COL_EMPRESA, COL_CARGO, FK_USUARIOS_USU_ID)
VALUES ('John Doe', 'john.doe@example.com', 'password123@', 'Your Company', 'Gerente de Projeto', 1);

-- Inserting the Project and Associating it with the Collaborator
INSERT INTO PROJETOS (PRO_DATA_INICIO, PRO_EMPRESA, PRO_PREVISAO_FIM, PRO_DESCRICAO, PRO_NOME, PRO_STATUS, PRO_RESTFACTOR, PRO_RESEFACTOR)
VALUES ('2024-01-24', 'Your Company', '2024-12-31', 'Project Description', 'Project Name', 'EM ANDAMENTO', 0.0, 0.0);

-- Get the ID of the newly inserted project
SET @projeto_id := LAST_INSERT_ID();

-- Associate the project with the collaborator
INSERT INTO COLABORADORES_PROJETOS (FK_COLABORADORES_COL_ID, FK_COLABORADORES_FK_USUARIOS_USU_ID, FK_PROJETOS_PRO_ID, COP_ADMINISTRADOR, COP_ATIVO)
VALUES (1, 1, @projeto_id, TRUE, TRUE); 

-- Inserting Actors (Simple, Medium, Complex)
INSERT INTO ATORES (ATO_NOME, ATO_COMPLEXIDADE, ATO_DESCRICAO, FK_PROJETOS_PRO_ID)
VALUES
('Actor 1 Simple', 'SIMPLES', 'Actor 1 Description', @projeto_id),
('Actor 2 Simple', 'SIMPLES', 'Actor 2 Description', @projeto_id),
('Actor 3 Simple', 'SIMPLES', 'Actor 3 Description', @projeto_id),
('Actor 4 Simple', 'SIMPLES', 'Actor 4 Description', @projeto_id),
('Actor 5 Simple', 'SIMPLES', 'Actor 5 Description', @projeto_id),
('Actor 1 Medium', 'MEDIO', 'Actor 1 Description', @projeto_id),
('Actor 2 Medium', 'MEDIO', 'Actor 2 Description', @projeto_id),
('Actor 3 Medium', 'MEDIO', 'Actor 3 Description', @projeto_id),
('Actor 4 Medium', 'MEDIO', 'Actor 4 Description', @projeto_id),
('Actor 5 Medium', 'MEDIO', 'Actor 5 Description', @projeto_id),
('Actor 1 Complex', 'COMPLEXO', 'Actor 1 Description', @projeto_id),
('Actor 2 Complex', 'COMPLEXO', 'Actor 2 Description', @projeto_id),
('Actor 3 Complex', 'COMPLEXO', 'Actor 3 Description', @projeto_id),
('Actor 4 Complex', 'COMPLEXO', 'Actor 4 Description', @projeto_id),
('Actor 5 Complex', 'COMPLEXO', 'Actor 5 Description', @projeto_id);

-- Inserting Requirements and Use Cases (Simple, Medium, Complex)
INSERT INTO REQUISITOS_FUNCIONAIS (REQ_NOME, REQ_ESPECIFICACAO, FK_PROJETOS_PRO_ID)
VALUES
('Requirement 1', 'Specification for Requirement 1', @projeto_id),
('Requirement 2', 'Specification for Requirement 2', @projeto_id),
('Requirement 3', 'Specification for Requirement 3', @projeto_id),
('Requirement 4', 'Specification for Requirement 4', @projeto_id),
('Requirement 5', 'Specification for Requirement 5', @projeto_id),
('Requirement 6', 'Specification for Requirement 6', @projeto_id),
('Requirement 7', 'Specification for Requirement 7', @projeto_id),
('Requirement 8', 'Specification for Requirement 8', @projeto_id),
('Requirement 9', 'Specification for Requirement 9', @projeto_id),
('Requirement 10', 'Specification for Requirement 10', @projeto_id);

-- Inserting Use Cases (Simple, Medium, Complex) for each Requirement
INSERT INTO CASOS_DE_USO (CAS_NOME, CAS_DESCRICAO, CAS_COMPLEXIDADE, FK_REQUISITOS_FUNCIONAIS_REQ_ID)
VALUES
-- Use Cases for Requirement 1
('Use Case 1.1 Simple', 'Description for Use Case 1.1', 'SIMPLES', 1),
('Use Case 1.2 Medium', 'Description for Use Case 1.2', 'MEDIO', 1),
('Use Case 1.3 Complex', 'Description for Use Case 1.3', 'COMPLEXO', 1),
-- Use Cases for Requirement 2
('Use Case 2.1 Simple', 'Description for Use Case 2.1', 'SIMPLES', 2),
('Use Case 2.2 Medium', 'Description for Use Case 2.2', 'MEDIO', 2),
('Use Case 2.3 Complex', 'Description for Use Case 2.3', 'COMPLEXO', 2),
-- Continue this pattern for the remaining requirements and use cases
...
