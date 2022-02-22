const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const { validateBoard } = require("../validators/validators");

router.get('/boards', boardsController.getBoards );
router.post('/boards', validateBoard, boardsController.createBoard );

router.get('/boards/:id', boardsController.getBoard );

router.post('/lists', listsController.createList, boardsController.addList, listsController.sendList );

router.put('/lists/:id', listsController.editList);

module.exports = router;