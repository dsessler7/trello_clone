/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
const List = require("../models/list");
const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);
  console.log("req: ", req.body);
  const newList = {
    boardId: req.body.boardId,
    title: req.body.list.title
  };

  if (errors.isEmpty()) {
    List.create(newList)
      .then((list) => {
        req.list = list;
        next();
      })
      .catch((err) => {
        console.log(err);
        next(new HttpError("Creating list failed, please try again", 500))
      });

  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const sendList = (req, res, next) => {
  const { cards, ...listWithout } = req.list;
  console.log(listWithout);
  res.json(listWithout._doc);
};

const editList = (req, res, next) => {
  List.updateOne({ _id: req.params.id }, { $set: { title: req.body.title } })
    .then(() => {
      List.findOne({ _id: req.params.id }, "title _id createdAt updatedAt")
        .then((list) => {
          console.log(list)
          res.json(list)
        });
    })
    .catch((err) => {
      console.log(err);
      next(new HttpError("Editing list failed, please try again", 500));
    });
};

const addCardToList = (req, res, next) => {
  List.updateOne({ _id: req.card.listId }, { $push: { cards: req.card._id }})
    .populate({
      path: "cards",
      populate: { path: "comments" }
    })
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(err);
      next(new HttpError("Adding card failed, please try again", 500));
    });
};

exports.createList = createList;
exports.sendList = sendList;
exports.editList = editList;
exports.addCardToList = addCardToList;