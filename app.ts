import express, {Express, Request, Response} from 'express'
import {startServer} from "./start";
import {db} from "./db";
import cors from "./middleware/CORS";
import AuthRoute from "./routes/auth-route";
import TaskRoute from "./routes/task-route";
import tokenRoute from "./routes/token-route";

const app: Express = express()
app.use(express.json())
app.use(cors)
app.use('/auth',AuthRoute)
app.use('/tasks',TaskRoute)
app.use('/refresh',tokenRoute)

app.get("/", (req: Request, res: Response) => {
    res.send("hello")
})

startServer(app,db)