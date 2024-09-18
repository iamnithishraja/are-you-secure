import {Connection} from './config/connection.js'
import app from './app.js'
import dotenv from "dotenv/config";


app.listen(3000,()=>{
    console.log("listening on port 3k");
    Connection();

});