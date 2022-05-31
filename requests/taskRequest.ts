import {db} from "../db/index"
import {IGetTask, ITaskRequest} from "./types";
import {Request, Response} from "express";
import {IRequestUser} from "../middleware/types";

class TaskRequest implements ITaskRequest{
    public async addTask(req: IRequestUser, res: Response): Promise<void> {
        if(req.body.title && typeof req.body.done === 'boolean' && req.user?.id){
            try{
                await db.query("INSERT INTO tasks (title,done,user_id) VALUES ($1, $2, $3)",[
                    req.body.title,
                    req.body.done,
                    req.user.id,
                ])
                res.status(200).json({message: "task add OK"})
            }catch (e){
                res.status(500).json({message: "server error"})
            }
        }else{
            res.status(400).json({message:"No data"})
        }
    }

    public async delTasks(req: IRequestUser, res: Response): Promise<void> {
        if(req.query.id){
            try{
                await db.query("DELETE FROM tasks WHERE id = $1",[
                    +req.query.id
                ])
                res.status(200).json({message: "delete OK"})
            }catch (e){
                res.status(500).json({message: "server error"})
            }
        }else{
            try{
                await db.query("DELETE FROM tasks WHERE user_id = $1",[
                    req.user?.id
                ])
                res.status(200).json({message: "delete all tasks OK"})
            }catch (e){
                res.status(500).json({message: "server error"})
            }
        }
    }

    public async getTask(req: IRequestUser, res: Response): Promise<void> {
        if(req.user) {
            try {

                const data: IGetTask[] = await db.query("SELECT * FROM tasks WHERE user_id = $1", [
                    req.user.id
                ])
                res.status(200).json(data)
                 /*
                res.status(200).json(await db.query("SELECT * FROM tasks WHERE user_id = $1", [
                    req.user.id
                ]))
                  */
            } catch (e) {
                res.status(500).json({message: "server error"})
            }
        }
        else{
            res.status(500).json({message: "server error"})
        }
    }

    public async updateTask(req: IRequestUser, res: Response): Promise<void> {
        if(req.body.id && typeof req.body.done === 'boolean'){
            try{
                await db.query("UPDATE tasks SET done = $1 WHERE id =$2",[
                    req.body.done, req.body.id
                ])
                res.status(200).json({message: "task update OK"})
            }catch (e){
                res.status(500).json({message: "server error"})
            }
        }else{
            res.status(400).json({message:"No data"})
        }
    }

}

export default new TaskRequest()