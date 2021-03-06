/* eslint-disable max-len */
const Board = require("../models/board");
const List = require("../models/list");
const Card = require("../models/card");
const Comment = require("../models/comment");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json({
      boards,
    });
  });
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(
          (board) => res.json({ board })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const getBoard = (req, res, next) => {
  Board.findOne({ _id: req.params.id })
    .populate({
      path: "lists",
      populate: { path: "cards" }
    })
    .then((board) => {
      console.log(board);
      res.json(board);
    });
};

const addList = (req, res, next) => {
  Board.updateOne({ _id: req.body.boardId }, { $push: { lists: req.list._id }})
    .populate({
      path: "lists",
      populate: { path: "cards" }
    })
    .then(() => {
      next();
    });
};

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.addList = addList;