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
routes.post('/create-stakeholder', StakeholderController.create);

// Project Routes (CLOSED)
routes.get('/projetos/findByColaborador', verifyToken, ProjetoController.list);
routes.get('/projetos/findByNome', verifyToken, ProjetoController.listByName);
routes.get('/projetos/findById', verifyToken, ProjetoController.getById);
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

// Requirements Routes (CLOSED)
routes.get('/requisitos', verifyToken, ProjetoController.list);
routes.get('/requisitos/findByNome', verifyToken, ProjetoController.listByName);
routes.get('/requisitos/findById', verifyToken, ProjetoController.getById);
routes.post('/requisitos/new', verifyToken, ProjetoController.create);
routes.patch('/requisitos/update', verifyToken, ProjetoController.update);
routes.delete('/requisitos/delete', verifyToken, ProjetoController.delete);

// Actor Routes (CLOSED)
routes.get('/atores/findByAtor', verifyToken, AtoresController.list);
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
routes.get('/caso-de-uso/findByAtor', verifyToken, CasoUsoController.list);
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
routes.get('/cenarios/findByAtor', verifyToken, CenariosController.list);
routes.get('/cenarios/findByNome', verifyToken, CenariosController.listByName);
routes.get('/cenarios/findById', verifyToken, CenariosController.getById);
routes.post('/cenarios/new', verifyToken, CenariosController.create);
routes.patch('/cenarios/update', verifyToken, CenariosController.update);
routes.delete('/cenarios/delete', verifyToken, CenariosController.delete);

// Fatores Ambientais Routes (CLOSED)

routes.get('/fatores-ambientais/findByDescricao', verifyToken, FatAmbController.listByDescricao);
routes.get('/fatores-ambientais/findById', verifyToken, FatAmbController.listById);
routes.get('/fatores-ambientais/getById', verifyToken, FatAmbController.getById);
routes.patch('/fatores-ambientais/update', verifyToken, FatAmbController.update);

// Fatores Tecnicos Routes (CLOSED)

routes.get('/fatores-tecnicos/findByDescricao', verifyToken, FatTecController.listByDescricao);
routes.get('/fatores-tecnicos/findById', verifyToken, FatTecController.listById);
routes.get('/fatores-tecnicos/getById', verifyToken, FatTecController.getById);
routes.patch('/fatores-tecnicos/update', verifyToken, FatTecController.update);


export const allRoutes = routes;