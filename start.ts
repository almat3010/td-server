import {Express} from "express";
import {IDatabase} from "pg-promise";
import {IClient} from "pg-promise/typescript/pg-subset";

const port: string|number = process.env.PORT || '4000'

export const startServer = async (app: Express, db: IDatabase<{}, IClient>) =>{
    app.listen(+port,'localhost', async() => {
        try{
            await db.connect()
            console.log('connected')
        }catch (e){
            console.log('no')
        }
        console.log('server listening on port' + port )
    })
}