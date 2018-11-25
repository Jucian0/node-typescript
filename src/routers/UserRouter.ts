import UserController from '../controllers/UserController';
import { Router } from 'express';
import Auth from '../guard/auth';

/**
 * @class UserRouter
 */
export default class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', Auth.authorize, UserController.getUser);
        this.router.post('/', UserController.createUser);
        this.router.get('/:userId', UserController.getById);
    }
}
