import Router from 'express';
import AuthController from './app/controllers/AuthController';
import ProjectController from './app/controllers/ProjectController';
import authenticate from './app/middlewares/auth';

const routes = Router();

routes.get('/', (req, res) => res.json('Hello world!!!'));

routes.get('/user/:email', AuthController.show);

routes.post('/register', AuthController.register);
routes.post('/authenticate', AuthController.authenticate);
routes.post('/forgot-password', AuthController.forgotPassword);

routes.use('/', authenticate);

const project = new ProjectController();
routes.get('/project', project.show);

export default routes;