const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr', {
    logging: false
});
const Gardener = db.define("gardener", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
const Plot = db.define("plot", {
    size: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    shaded: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});
const Vegetable = db.define("vegetable", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    planted_on: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

// a Plot being part of a Gardener with the foreign key on the Plot.
Plot.belongsTo(Gardener); // Will add a gardenerId attribute to Plot to hold the primary key value for Gardener


// One-way associations
// hasOne will add an attribute gardenerId to the Plot model!
Gardener.hasOne(Plot);


/*This will create a new model called vegetable_plot
 with the equivalent foreign keys vegetableId and plotId. 
*/
Vegetable.belongsToMany(Plot, {
    through: 'vegetable_plot'
})


/*This will create a new model called vegetable_plot
 with the equivalent foreign keys vegetableId and plotId. 
*/


Plot.belongsToMany(Vegetable, {
    through: 'vegetable_plot'
})


// a Gardener being part of a Vegetable with the foreign key on the Gardener called favoritevegetable.
Gardener.belongsTo(Vegetable, {
    as: 'favoriteVegetable'
})



module.exports = {
    db,
    Gardener,
    Vegetable,
    Plot
};