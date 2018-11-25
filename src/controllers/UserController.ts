import UserModel from '../models/UserModel';
import * as express from 'express';
import { httpError } from '../util/util';

class UserController {
    /**
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    static async getUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const users = await UserModel.find();
            res.status(200).json({ users });
        } catch (err) {
            res.status(500).json(httpError(err));
            next(err);
        }
    }

    /**
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    static async getById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const user = await UserModel.findById(req.params.userId);
            res.status(200).json({ user });
        } catch (err) {
            res.status(500).json(httpError(err));
            next(err);
        }
    }

    /**
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    static async createUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const user = await UserModel.create(req.body.name);
            res.status(200).json({ user })
        } catch (err) {
            res.status(500).json(httpError(err));
            next(err);
        }
    }
}

export default UserController;