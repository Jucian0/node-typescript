import * as express from 'express';
import UserRouter from './UserRouter';
import { IServer } from '../interfaces/ServerInterface';
import AuthRouter from './AuthRoutes';

export default class Routes {
    /**
     * @param  {IServer} server
     * @returns void
     */
    static init(server: IServer): void {
        const router: express.Router = express.Router();

        server.app.use('/', router);

        server.app.use('/v1/users', new UserRouter().router);

        server.app.use('/v1', new AuthRouter().router);
    }
}
