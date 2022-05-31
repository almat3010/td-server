import {Connection} from "../type";
import pg from "pg-promise";
import {IClient} from "pg-promise/typescript/pg-subset";
import dbConfig from '../db.config.json'

const conn : Connection= {
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port,
    host: dbConfig.host,
    database: dbConfig.database
}
export const db: pg.IDatabase<{},IClient >= pg()(conn)