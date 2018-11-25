import UserController from '../controllers/UserController';
import { Router } from 'express';
import Auth from '../guard/auth';
import AuthController from '../controllers/AuthController';

/**
 * @class AuthRouter
 */
export default class AuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.post('/login', AuthController.login);
        this.router.post('/register', AuthController.register);
        this.router.get('/whoami/:userId', AuthController.whoAmI);
    }
}