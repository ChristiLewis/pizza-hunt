//SET-UP FOR EXPRESS.JS
const router = require('express').Router();

//SET GET AND POST ROUTES TO  /API/PIZZAS
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

//SET GET ONE, PUT, AND DELETE AT /API/PIZZAS/:ID
router.route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;