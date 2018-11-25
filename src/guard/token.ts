import * as JWT from 'jsonwebtoken';
import * as Moment from 'moment';
import { resolve } from 'path';
import { IUserModel } from '../models/UserModel';

export const secret = {
    key: 'super-secret'
};

export default class Token {

    static generate(user: IUserModel) {
        return JWT.sign({ id: user.id }, secret.key, {
            expiresIn: 86400
        });
    }

    static isValidToken(token: any) {
        if (JWT.decode(token, secret.key) > Moment().format('x')) {
            return true
        }
        return false;
    }
}