if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require('express');
const socket = require('./funcs/socketIO');

const loginRouter = require('./routes/login');
const forgotRouter = require('./routes/forgot');
const stockRouter = require('./routes/stockdata');

const circleReq = require('./funcs/circleReq');

/************************************** MongoDB Connection **********************************/
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.mongousername}:${process.env.password}@${process.env.cluster}.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`,{});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error : "));
db.once("open",function(){
    console.log("Connected successfully !!!");
    socket.init(http);
    circleReq.init();
});
/*********************************    End MongoDB connection     *************************/

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const http = require("http").createServer(app);
const cors = require('cors');

app.use(cors({origin:"*"}));

app.use("/",loginRouter);
app.use("/",forgotRouter);
app.use("/",stockRouter);
/**************************************   END         ********************************* */

http.listen(process.env.PORT,()=>{
    console.log(`Server listening on ${process.env.PORT}`);
});
