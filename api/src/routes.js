import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config/auth.config.js';
import { AuthController } from './controllers/AuthController.js';
import { StakeholderController } from './controllers/StakeholderController.js';
import { ProjetoController } from './controllers/ProjetoController.js';

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

export const allRoutes = routes;