import Router from 'express';
import authController from './controllers/authController';

const routes = Router();

routes.get('/', (req, res) => res.json('Hello world!!!'));

const auth = new authController();

routes.get('/user/:email', auth.show);

routes.post('/register', auth.register);
routes.post('/authenticate', auth.authenticate);

export default routes;