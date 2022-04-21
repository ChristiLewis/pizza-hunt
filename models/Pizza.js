//IMPORT THE PARTS NEEDED FROM THE MONGOOSE LIB
const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

//MAKE THE MODEL
const Pizza = model('Pizza', PizzaSchema);
//EXPORT THE MODEL
module.exports = Pizza;