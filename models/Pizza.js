//IMPORT THE PARTS NEEDED FROM THE MONGOOSE LIB
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String
        },
        createdBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //GETTER METHOD
            get: createdAtVal => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            default: 'Large'
        },
        toppings: [],

        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            //ACTIVATE GETTERS FOR THE DATEFORMAT FUNCTIONALITY
            getters: true
        },
        //MONGOOSE RETURNS THIS VIRTUAL SO THE ID IS NA
        id: false
    }
);

//ADD VIRTUAL TO COUNT THE NUMBER OF COMMENTS ON RETRIEVAL
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

//MAKE THE MODEL
const Pizza = model('Pizza', PizzaSchema);
//EXPORT THE MODEL
module.exports = Pizza;