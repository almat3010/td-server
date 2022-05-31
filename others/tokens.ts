import {Request, Response} from "express";
import {IAccessTokens, IPayLoadToken, IRefreshTokens} from "./types";
import jwt from 'jsonwebtoken';
import {access_token,refresh_token} from './../server.config.json'

export const accessToken :IAccessTokens =  (id, login) => {
    const payload : IPayLoadToken= {
        id,
        login
    }
    return jwt.sign(payload, access_token.secret_key,
        {expiresIn: access_token.time})
}

export const refreshToken :IRefreshTokens =  id => {
    const payload = {
        id
    }
    return jwt.sign(payload, refresh_token.secret_key,
        {expiresIn: refresh_token.time})
}