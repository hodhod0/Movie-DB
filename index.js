const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Ok"));
app.listen(port, ()=>{

    console.log('server is  at http://localhost:3000')
})


app.get("/test", (req, res)=>{
    res.send({status:200, message:"Ok"})
})
app.get("/time", (req, res)=>{
    const date=new Date();
var hour = date.getHours();

var min = ('0'+date.getMinutes().toString()).slice(-2);
    res.send(`{status:200, message:${hour}:${min}`)
})
