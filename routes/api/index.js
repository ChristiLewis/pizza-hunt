const router = require('express').Router();
//IMPORT ALL ROUTES IN THE API FOLDER
const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');

//ADD PREFIX OF COMMENTS TO ROUTES IN COMMENT-ROUTES.JS
router.use('/comments', commentRoutes);

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/pizzas', pizzaRoutes);

module.exports = router;