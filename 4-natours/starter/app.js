// const http  = require('http');
const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send("do it post")    //defould status code is 200
})

app.post("/", (req,res)=>{
res.send("you can send to this in post ")
})


const port = 3000
app.listen(port, ()=>{
console.log(`app is running on port ${port}`);
})