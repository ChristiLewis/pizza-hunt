const { Pizza } = require('../models');

const pizzaController = {
    //FUNCTIONS AS METHODS GO HERE

    //GET ALL
    getAllPizza(req, res) {
        Pizza.find({})
            //ADD .POPULATE METHOD TO SEE THE ACTUAL COMMENTS ASSOCIATED WITH THE PIZZA INSTEAD OF ONLY THE OBJECTID
            .populate({
                path: 'comments',
                select: '-_v'
            })
            //ADD .SELECT() METHOD TO EDIT OUT THE RETURN OF THE _VFIELD FOR THE MODEL TOO
            .select('-_v')
            //.SORT() METHOD IN DESCENDING ORDER
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //GET ONE BY ID
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            //ADD .POPULATE METHOD TO SEE THE ACTUAL COMMENTS ASSOCIATED WITH THE PIZZA INSTEAD OF ONLY THE OBJECTID
            .populate({
                path: 'comments',
                select: '-_v'
            })
            //ADD .SELECT() METHOD TO EDIT OUT THE RETURN OF THE _VFIELD FOR THE MODEL TOO
            .select('-_v')
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No Pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //CREATE MODEL
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    //UPDATE MODEL
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No Pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    //DELETE MODEL
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No Pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }


};

module.exports = pizzaController;