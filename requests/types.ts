import {Request, Response} from "express";
import {IRequestUser} from "../middleware/types";

export interface IAuthRequest{
    authorization(req: Request, res: Response): void
    registration(req: Request, res: Response): void
}
export interface ITaskRequest{
    getTask(req: IRequestUser, res: Response): void
    addTask(req: IRequestUser, res: Response): void
    updateTask(req: IRequestUser, res: Response): void
    delTasks(req: IRequestUser, res: Response): void
}
export interface ITask{
    title: string,
    done: boolean,
}
export interface IGetTask extends ITask{
    id: number
}
export interface IUpdT{
    upd(req: Request,res: Response): void
}