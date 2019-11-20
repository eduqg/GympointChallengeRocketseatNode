/* Responsável por rotas que serão utlizadas em todo projeto */
import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlansController from './app/controllers/PlansController';
import RegistrationsController from './app/controllers/RegistrationsController';
import CheckinsController from './app/controllers/CheckinsController';
import HelpOrdersController from './app/controllers/HelpOrdersController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Iniciar Sessão
// Criação de sessão com retorno de token
routes.post('/sessions', SessionController.store);

// Pega usuário pelo nome
routes.post('/students/sign', StudentController.studentSign);

// Pedidos de auxílio do aluno - Native
routes.get('/students/:id/help-orders', HelpOrdersController.questions_student);

// Novo Pedido de auxílio - Native
routes.post('/students/:id/help-orders', HelpOrdersController.store_question);

// Visualizar resposta - Native
routes.get('/help-orders(/:id)?', HelpOrdersController.index);

routes.get('/students/:id/checkins', StudentController.checkins);
routes.post('/checkins', CheckinsController.store);
// Rotas a partir daqui precisar de token de autenticação
routes.use(authMiddleware);

// Usuário
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

// Alunos
routes.get('/students(/:id)?', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students', StudentController.delete);

// Planos
routes.get('/plans(/:id)?', PlansController.index);
routes.post('/plans', PlansController.store);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans', PlansController.delete);

// Matrículas
routes.post('/registrations', RegistrationsController.store);
routes.get('/registrations', RegistrationsController.index);
routes.get('/registrations/:id', RegistrationsController.getone);
routes.put('/registrations/:id', RegistrationsController.update);
routes.delete('/registrations/:id', RegistrationsController.delete);

// Checkins
routes.get('/checkins', CheckinsController.index);

// Help Orders
routes.post('/help-orders/:id/answer', HelpOrdersController.store_answer);
routes.get(
  '/help-orders-not-answered',
  HelpOrdersController.index_not_answered
);
// reoutes.get('/students/:id/help-orders', HelpOrdersController.index);

// Será utilizado na classe App, para configurar rotas disponíveis
export default routes;
