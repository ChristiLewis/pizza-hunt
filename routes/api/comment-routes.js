//IMPORT EXPRESS AND CONTROLLER FUNCTIONALITY
const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

//SET A POST ROUTE TO /API/CONTINUES/:THOUGHTID VIA THE ADDCONTINUE() METHOD
router.route('/:pizzaId').post(addComment);

//USE A DELETE CALLBACK VIA REMOVECOMMENT() METHOD SET-UP AS THE ROUTE /API/COMMENTS/:PIZZAID/:COMMENTID ---> ADD REPLY UPDATING FUNCTIONALITY
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

//ADD A ROUTE TO DELETE A REPLY /API/COMMENTS/:PIZZAID/:COMMENTID/:REPLYID --->DELETE
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);

//EXPORT THIS ROUTER
module.exports = router;
