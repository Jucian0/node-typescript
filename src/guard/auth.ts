import * as express from 'express';
import Token from './token';
import * as  byCript from 'bcryptjs';

export default class Auth {

    /***
     * middleware guard routes
     */
    static async authorize(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        let apiToken = req.headers['x-api-token'];
        if (apiToken) {
            if (Token.isValidToken(apiToken)) {
                next()
            } else return res.status(401).send({ message: 'Token not found' });
        } else return res.status(401).send({ message: 'Token not found' });
    }

    static hasPassword(password: string) {
        return new Promise((resolve, reject) => {
            byCript.genSalt(10, (err, salt) => {
                if (err) return reject(err);

                byCript.hash(password, salt, (err, hash) => {
                    if (err) return reject(err);
                    return resolve(hash);
                });
            });
        });
    }

    static authenticate(password: string, hash: string) {
        return new Promise((resolve, reject) => {
            byCript.compare(password, hash, (err, res) => {
                if (err) return reject(err);
                return resolve(res)
            });
        });
    }
}
