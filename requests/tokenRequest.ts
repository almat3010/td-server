import {IUpdT} from "./types";
import {Request, Response} from "express";
import {accessToken, refreshToken} from "../others/tokens";
import {v4} from "uuid";
import {db} from "../db";
import {access_token} from "../server.config.json";
import {IUser} from "../middleware/types";
import checkRT from "../middleware/checkRT";

export class TokenRequest implements IUpdT{
    public async upd(req: Request, res: Response): Promise<void> {
        if(req.body?.refreshT){
            try{
                const user: IUser = await checkRT(req.body.refreshT)
                const accessT: string = accessToken(user.id, user.login)
                const refresh_id: string = v4()
                const refreshT: string = refreshToken(refresh_id)
                try {
                    await db.query("UPDATE users SET refresh_id = $1 WHERE login = $2",[
                        refresh_id, user.login
                    ])
                    res.status(200).json({message: "token is update ok!", accessT, refreshT,
                        access_expiresIn: access_token.time,
                        access_date: new Date().getTime()})
                }catch (e){
                    res.status(500).json({message: "server error"})
                }
            }catch (e){
                res.status(403).json({message: "token not valid"})
            }
        }else{
            res.status(400).json({message: "no data"})
        }
    }

}

export default new TokenRequest()