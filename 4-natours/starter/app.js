const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json()) // To get the body-data from the use in post request (middleware). if you don't add this you will get undefined if you want to acces the req.body

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req,res)=>{
    res.status(200).json({
        "status":"success",
        "results": tours.length,
        "data": {tours},
    })    
})

app.post('/api/v1/tours', (req,res)=>{
    const newId  = tours[tours.length -1].id + 1;
    const newTour = Object.assign({id: newId},req.body ) // This overwrites original variable
     tours.push(newTour)
    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),(err)=>{ // Stringify : JS => JSON,   
        res.status(201).json({ // 201 = created
            "status":"success",
            "results": tours.length,
            "data": {tour : newTour},
        })
    })

})

const port = 3000
app.listen(port, ()=>{
console.log(`app is running on port ${port}`);
})