//IMPORT THE PARTS NEEDED FROM THE MONGOOSE LIB
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            required: 'You need to provide a pizza name!',
            trim: true
        },
        createdBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //GETTER METHOD
            get: createdAtVal => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

//MAKE THE MODEL
const Pizza = model('Pizza', PizzaSchema);
//EXPORT THE MODEL
module.exports = Pizza;