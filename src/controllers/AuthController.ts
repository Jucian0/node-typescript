import * as express from 'express';
import UserModel from '../models/UserModel';
import Auth from '../guard/auth';
import Token from '../guard/token';


export default class AuthController {

    /**
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    static async login(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            if (!user) return res.status(401).json({ message: 'Not Authorized' });

            const auth = await Auth.authenticate(req.body.password, user.password);
            if (!auth) return res.status(401).json({ message: 'Not Authorized' });

            res.status(200).json({ token: Token.generate(user), _id: user._id })

        } catch (err) {
            res.status(401).json({ message: 'Not Authorized' });
            next(err)
        }
    }

    /**
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    static async register(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const hasPassword = await Auth.hasPassword(req.body.password);
            const register = await UserModel.create({
                name: req.body.name,
                email: req.body.email,
                password: hasPassword
            });
            res.status(200).json(register);
        } catch (err) {
            res.status(500).json(
                { message: 'Some error ocurred while creating the user.' }
            );
            next(err);
        }
    }

    /**
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    static async whoAmI(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const user = await UserModel.findById(req.params.userId);
            res.status(200).json(user)
        } catch (err) {
            res.status(401).json({ message: 'Not Authorized' });
            next(err)
        }
    }
}