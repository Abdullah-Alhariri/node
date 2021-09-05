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

app.get('/api/v1/tours/:id', (req,res)=>{// After th ":" comes the variable, the value is stored in req.params. For optional variables type ? after them 
    console.log(req.params.id);
    // console.log(tours.data.tours);

    // const tour = tours.find (el=> el.data.tours.id === req.params.id)

    res.status(200).json({
        "status":"success",
        "results": tours.length,
        "data": {"tour": JSON.stringify(tours.data)},
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