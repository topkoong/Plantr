const {db, Vegetable, Gardener, Plot} = require('./models');
const express = require('express');
const app = express();


const PORT = 3000;


const init = () =>{
    db.sync({force: true})
    .then(() => {
        console.log("Database Synced!")
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(()=>{
        db.close();
    })
    app.listen(PORT, () =>{
        console.log(`USING ${PORT}`);
    })
}

init();

app.get('/', (req, res) =>{
    res.send('This page is working!');
})

const addToDb = () =>{
    Gardener.create({})
        .then(gardener => {
            return Vegetable.create({
                gardnerId: gardener.id
            })
        })


    Vegetable.create({name: 'tomato', color: 'red', planted_on: Date.now()})
    .then(veg =>{
        // return veg.create({name: veg.name, color: veg.color, planted_on: veg.planted_on})
        return 
    })
    .then((veg)=>{
        console.log("vegetable created", veg);
    })
}

addToDb();


