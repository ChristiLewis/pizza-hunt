//IMPORT EXPRESS AND CONTROLLER FUNCTIONALITY
const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

//SET A POST ROUTE TO /API/CONTINUES/:THOUGHTID VIA THE ADDCONTINUE() METHOD
router.route('/:pizzaId').post(addComment);

//USE A DELETE CALLBACK VIA REMOVECOMMENT() METHOD SET-UP AS THE ROUTE /API/CONTINUES/:THOUGHTID/:CONTINUEID 
router.route('/:pizzaId/:commentId').delete(removeComment);

//EXPORT THIS ROUTER
module.exports = router;
