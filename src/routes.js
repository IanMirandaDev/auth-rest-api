import Router from 'express';
import authController from './controllers/authController';

const routes = Router();

routes.get('/', (req, res) => res.json('Hello world!!!'));

const auth = new authController();

routes.get('/user/:email', auth.show);

routes.route('/auth')
    .post(auth.create)

export default routes;