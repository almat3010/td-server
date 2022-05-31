import {json, NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {access_token} from "./../server.config.json"
import {db} from "./../db/index"
import {IPayLoadToken} from "../others/types";
import {IRequestUser} from "./types";

export default async function checkAT(req: IRequestUser, res: Response, next: NextFunction): Promise<void> {
    if(req.method==='OPTIONS'){
        next()
    }
    const tkn :string = req.headers['authorization']?.split(' ')[1] || ''
    if(!tkn){
        res.status(403).json({message:'no authorization'})
    }
    try {
        const payload :JwtPayload|string = await jwt.verify(tkn, access_token.secret_key)
        try{
            const user: any = await db.query('SELECT * FROM users WHERE id=$1 AND login=$2',[
                (payload as IPayLoadToken).id,
                (payload as IPayLoadToken).login
            ])
            req.user=user[0]
            next()
        }catch (e){
            res.status(403).json({message: "no authorization"})
        }
    }catch (e){
        res.status(403).json({message: "no authorization"})
    }
}