const { db, Vegetable, Gardener, Plot } = require('./models');
const express = require('express');
const app = express();


const PORT = 3000;


const init = () => {
    db
    .sync()
    .then(result => {
        console.log("Database synced!");
        app.listen(PORT, () =>{
            console.log(`USING ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(()=>{
        db.close();
    })
}

init();

app.get('/', (req, res) =>{
    res.send('This page is working!');
})

const addToDb = () => {
    const vegetableData = { name: 'tomato', color: 'red', planted_on: Date.now() }
    console.log('Created Vegetable');
    Vegetable.create(vegetableData)
    .then(tomato => {
        console.log('Created Gardener');
        console.log('Added an attribute favoriteVegetableId (the foreign key to the Vegetable table) to Gardener model');
        return Gardener.create({ name: 'David Morgan', age: 15, favoriteVegetableId: tomato.id });
    })
    .then(gardener => {
        console.log('Created Plot');
        console.log('Added an attribute gardenerId to the Plot model');
        return Plot.create({size: 10, shaded: false, gardenerId: gardener.id });
    })
    .then(plot => {
        // IIFEs - Immediately Invoked Function Expressions
        (() => {
            console.log('Find an attribute gardenerId from Gardener model')
            return Gardener.findById(plot.gardenerId)
        })()
        .then(gardener => {
            console.log('Find an attribute favoriteVegetableId from Vegetable model')
            return Vegetable.findById(gardener.favoriteVegetableId);
        })
        .then(vegetable => {
            console.log('Added an attribute plotId to Vegetable model')
            vegetable.addPlot(plot);
        });
    });
}

addToDb();


