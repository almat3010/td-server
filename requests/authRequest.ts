import {db} from "../db"
import {IAuthRequest} from "./types";
import {Request, Response} from "express";
import hash, {compareSync, hashSync} from "bcrypt";
import {v4} from "uuid"
import {accessToken, refreshToken} from "../others/tokens";
import {access_token} from './../server.config.json'

class AuthRequest implements IAuthRequest{
    public async registration(req: Request, res: Response){
        const {login, password} = req.body
        if(login && password){
            const refresh_id : string = v4()
            const hashPass : string = hashSync(password, 10)
            try {
                const user: any = await db.query('INSERT INTO users (login, password, refresh_id) VALUES ($1,$2,$3) returning *',
                    [login, hashPass, refresh_id])
                const accessT = accessToken(user[0].id, login)
                const refreshT = refreshToken(user[0].refresh_id)
                res.status(200).json({message:'add user', accessT, refreshT,
                    access_expiresIn:access_token.time,
                    access_date: new Date().getTime()})
            }catch (e) {
                console.log(e)
                res.status(500).json({message:'server error'})
            }
        }else {
            res.status(400).json({message:'not filled input'})
        }
    }
    public async authorization(req: Request, res: Response) {
        const {login, password} = req.body
        if(login && password){
            const hashPass : string = hashSync(password, 10)
            try {
                const user: any = await db.query('SELECT * FROM users WHERE login = $1',
                    [login])
                if(compareSync(password,user[0].password) && user){
                    const accessT = accessToken(user[0].id, login)
                    const refreshT = refreshToken(user[0].refresh_id)
                    res.status(200).json({message:'OK', accessT, refreshT,
                        access_expiresIn:access_token.time,
                        access_date: new Date().getTime()})
                }else {
                    res.status(400).json({message:'wrong password'})
                }
            }catch (e) {
                console.log(e)
                res.status(500).json({message:'wrong user'})
            }
        }else {
            res.status(400).json({message:'not filled input'})
        }
    }
}

export default new AuthRequest()