import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config/auth.config.js';
import { AuthController } from './controllers/AuthController.js';
import { StakeholderController } from './controllers/StakeholderController.js';
import { ProjetoController } from './controllers/ProjetoController.js';
import { AtoresController } from './controllers/AtorController.js';
import { CasoUsoController } from './controllers/CasoUsoController.js';
import { CenariosController } from './controllers/CenariosController.js';
import { FatAmbController } from './controllers/FatAmbController.js';
import { FatTecController } from './controllers/FatTecController.js';
import { ColaboradorController } from './controllers/ColaboradorController.js';
import { RequisitoController } from './controllers/RequisitoController.js';
import { PriorizacaoController } from './controllers/PriorizacaoController.js';

const routes = express.Router();

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token){
            return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
        }

        jwt.verify(token, config.secret, function(err){ 
            if (err){
                return res.status(500).send({ auth: false, message: 'Token inválido.' }); 
            }
            next(); 
        });
        
    } catch(ex) {
        console.log(ex)
        res.sendStatus(401);
    }
}

// Verify Token Route
routes.get('/verify', AuthController.verifyLogin);

// Signin and Signup Routes (OPEN)
routes.post('/signup', AuthController.signup);
routes.post('/signin-colaborador', AuthController.signinColaborador);
routes.post('/signin-stakeholder', AuthController.signinStakeholder);

// Project Routes (CLOSED)
routes.get('/projetos/findByColaborador', verifyToken, ProjetoController.list);
routes.get('/projetos/findByNome', verifyToken, ProjetoController.listByName);
routes.get('/projetos/findById', verifyToken, ProjetoController.getById);
routes.get('/projetos/findByIdStakeholder', verifyToken, ProjetoController.getByStakeholderId);
routes.get('/projetos/metrics/total', verifyToken, ProjetoController.getNumberOfProjects);
routes.get('/projetos/metrics/new', verifyToken, ProjetoController.getNumberOfNewProjects);
routes.get('/projetos/metrics/ongoing', verifyToken, ProjetoController.getNumberOfOngoingProjects);
routes.get('/projetos/metrics/finished', verifyToken, ProjetoController.getNumberOfDoneProjects);
routes.post('/projetos/new', verifyToken, ProjetoController.create);
routes.patch('/projetos/update', verifyToken, ProjetoController.update);
routes.delete('/projetos/delete', verifyToken, ProjetoController.delete);
routes.get('/projetos/colaboradores', verifyToken, ProjetoController.listCollaborators);
routes.get('/projetos/colaboradores/findByNome', verifyToken, ProjetoController.listCollaboratorsByName);
routes.post('/projetos/addColaborador', verifyToken, ProjetoController.addCollaborator);
routes.delete('/projetos/removeColaborador', verifyToken, ProjetoController.removeCollaborator);

// Collaborator Routes (CLOSED)
routes.get('/colaboradores', verifyToken, ColaboradorController.listByName);

// Stakeholders Routes (CLOSED)
routes.post('/create-stakeholder', StakeholderController.create);
routes.get('/stakeholders/findByProjeto', verifyToken, StakeholderController.listByProjeto);
routes.get('/stakeholders/findByNome', verifyToken, StakeholderController.listByProjetoAndName);
routes.delete('/stakeholders/delete', verifyToken, StakeholderController.delete);
routes.patch('/stakeholders/alert', verifyToken, StakeholderController.alertStakeholder);
routes.get('/stakeholders/verifyParticipation', verifyToken, StakeholderController.verifyAllStakeholdersParticipation);

// Requirements Routes (CLOSED)
routes.get('/requisitos', verifyToken, RequisitoController.list);
routes.get('/requisitos/findByNome', verifyToken, RequisitoController.listByNamePaginated);
routes.get('/requisitos/findById', verifyToken, RequisitoController.getById);
routes.post('/requisitos/new', verifyToken, RequisitoController.create);
routes.patch('/requisitos/update', verifyToken, RequisitoController.update);
routes.delete('/requisitos/delete', verifyToken, RequisitoController.delete);
routes.get('/requisitos/resultados/list', verifyToken, RequisitoController.listResultados);
routes.get('/requisitos/resultados/findByNome', verifyToken, RequisitoController.listResultadosByName);
routes.get('/requisitos/priorizacao-stakeholders', verifyToken, RequisitoController.listPriorizacaoStakeholdersWithoutPagination);
routes.get('/requisitos/priorizacao-stakeholders/list', verifyToken, RequisitoController.listPriorizacaoStakeholders);
routes.get('/requisitos/priorizacao-stakeholders/findByNome', verifyToken, RequisitoController.listPriorizacaoStakeholdersByNome);

// Priorization Routes (CLOSED)
routes.post('/priorizacao-stakeholders/new', verifyToken, PriorizacaoController.insertPriorizacaoStakeholder);
routes.patch('/priorizacao-stakeholders/result', verifyToken, PriorizacaoController.insertResultadoPriorizacao);
routes.patch('/priorizacao-stakeholders/complete', verifyToken, PriorizacaoController.completePriorizacaoStakeholder);

// Actor Routes (CLOSED)
routes.get('/atores', verifyToken, AtoresController.list);
routes.get('/atores/findByNome', verifyToken, AtoresController.listByName);
routes.get('/atores/findById', verifyToken, AtoresController.getById);
routes.get('/atores/metrics/total', verifyToken, AtoresController.getNumberOfAtores);
routes.get('/atores/metrics/simples', verifyToken, AtoresController.getNumberOfAtoresSimples);
routes.get('/atores/metrics/medios', verifyToken, AtoresController.getNumberOfAtoresMedios);
routes.get('/atores/metrics/complexos', verifyToken, AtoresController.getNumberOfAtoresComplexos);
routes.post('/atores/new', verifyToken, AtoresController.create);
routes.patch('/atores/update', verifyToken, AtoresController.update);
routes.delete('/atores/delete', verifyToken, AtoresController.delete);

// Use Case Routes (CLOSED)
routes.get('/caso-de-uso', verifyToken, CasoUsoController.list);
routes.get('/caso-de-uso/findByNome', verifyToken, CasoUsoController.listByName);
routes.get('/caso-de-uso/findById', verifyToken, CasoUsoController.getById);
routes.get('/caso-de-uso/metrics/total', verifyToken, CasoUsoController.getNumberOfCasos);
routes.get('/caso-de-uso/metrics/simples', verifyToken, CasoUsoController.getNumberOfCasosSimples);
routes.get('/caso-de-uso/metrics/medios', verifyToken, CasoUsoController.getNumberOfCasosMedios);
routes.get('/caso-de-uso/metrics/complexos', verifyToken, CasoUsoController.getNumberOfCasosComplexos);
routes.post('/caso-de-uso/new', verifyToken, CasoUsoController.create);
routes.patch('/caso-de-uso/update', verifyToken, CasoUsoController.update);
routes.delete('/caso-de-uso/delete', verifyToken, CasoUsoController.delete);

//Cenario Routes (CLOSED)
routes.get('/cenarios', verifyToken, CenariosController.list);
routes.get('/cenarios/findByNome', verifyToken, CenariosController.listByName);
routes.get('/cenarios/findById', verifyToken, CenariosController.getById);
routes.post('/cenarios/new', verifyToken, CenariosController.create);
routes.patch('/cenarios/update', verifyToken, CenariosController.update);
routes.delete('/cenarios/delete', verifyToken, CenariosController.delete);

// Fatores Ambientais Routes (CLOSED)

routes.get('/fatores-ambientais', verifyToken, FatAmbController.list);
routes.get('/fatores-ambientais/getById', verifyToken, FatAmbController.getById);
routes.post('/fatores-ambientais/new', verifyToken, FatAmbController.create);
routes.patch('/fatores-ambientais/update', verifyToken, FatAmbController.update);
routes.delete('/fatores-ambientais/delete', verifyToken, FatAmbController.delete);

// Fatores Tecnicos Routes (CLOSED)

routes.get('/fatores-tecnicos', verifyToken, FatTecController.list);
routes.get('/fatores-tecnicos/getById', verifyToken, FatTecController.getById);
routes.post('/fatores-tecnicos/new', verifyToken, FatTecController.create);
routes.patch('/fatores-tecnicos/update', verifyToken, FatTecController.update);
routes.delete('/fatores-tecnicos/delete', verifyToken, FatTecController.delete);


export const allRoutes = routes;