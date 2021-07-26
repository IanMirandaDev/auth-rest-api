import Router from 'express';
import AuthController from './app/controllers/AuthController';
import ProjectController from './app/controllers/ProjectController';
import authenticate from './app/middlewares/auth';

const routes = Router();

routes.get('/', (req, res) => res.json('Hello world!!!'));

const authController = new AuthController();

routes.get('/user/:email', authController.show);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

routes.use('/', authenticate);

const project = new ProjectController();
routes.get('/project', project.show);

export default routes;