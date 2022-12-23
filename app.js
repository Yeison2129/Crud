import express,{json} from "express";
import sessions from 'express-session';
import cookies from 'cookie-parser';
const timeExp = 1000*60*24;
import {PORT} from "./config.js";
import router from "./routes/routes.js";
import cors from 'cors'



const app = express();

//middlewares
app.use(cors())
app.use(cookies());
app.use(json());
app.use(sessions({
    secret: 'qaqswdefrgthyukilo',
    saveUninitialized: true,
    cookie: { maxAge: timeExp },
    resave: false
}))


app.use('/',router)

app.listen(PORT,()=>{
    console.log(`corre el servidor en el puerto ${PORT} :D`);
});