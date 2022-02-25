const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const commentsController = require("../controllers/commentsController");
const { validateBoard } = require("../validators/validators");

router.get('/boards', boardsController.getBoards );
router.post('/boards', validateBoard, boardsController.createBoard );

router.get('/boards/:id', boardsController.getBoard );

router.post('/lists', listsController.createList, boardsController.addList, listsController.sendList );

router.put('/lists/:id', listsController.editList);

router.get('/cards/:id', cardsController.getCard);

router.post('/cards', cardsController.createCard, listsController.addCardToList, cardsController.sendCard);

router.post('/comments', commentsController.createComment, cardsController.addCommentToCard, commentsController.sendComment);

router.put('/cards/:id', cardsController.editCard);

module.exports = router;