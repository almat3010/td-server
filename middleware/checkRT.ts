import jwt from "jsonwebtoken";
import {refresh_token} from "./../server.config.json"
import {db} from "./../db/index"
import {IRefreshTP, IUser} from "./types";

export default async function checkRT(refresh_Token: string): Promise<IUser> {
    try{
        const payload: any = jwt.verify(refresh_Token, refresh_token.secret_key)
            const user :IUser[] = await db.query("SELECT * FROM users WHERE refresh_id = $1",[
                (payload as IRefreshTP).id
            ])
            return user[0]
    }catch (e){
        throw Error('token not valid')
    }
}