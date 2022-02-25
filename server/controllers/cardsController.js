const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  Card.findOne({ _id: req.params.id })
    .populate({
      path: "comments"
    })
    .then((card) => {
      return res.json(card);
    })
    .catch((err) => {
      console.error(err);
      next(new HttpError("Getting card failed, please try again", 500));
    });
};

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  const newCard = {
    boardId: req.body.boardId,
    listId: req.body.listId,
    title: req.body.card.title
  };

  if (errors.isEmpty()) {
    Card.create(newCard)
      .then((card) => {
        req.card = card;
        next();
      })
      .catch((err) => {
        console.error();(err);
        next(new HttpError("Creating card failed, please try again", 500))
      });

  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const sendCard = (req, res, next) => {
  res.json(req.card);
};

const addCommentToCard = (req, res, next) => {
  Card.updateOne({ _id: req.comment.cardId }, { $push: { comments: req.comment._id }})
    .populate({
      path: "comments"
    })
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
      next(new HttpError("Adding comment failed, please try again", 500));
    });
};

const editCard = (req, res, next) => {
  Card.updateOne({ _id: req.params.id }, { $set: req.body.card })
    .then(() => {
      Card.findOne({ _id: req.params.id })
        .then((card) => {
          console.log(card)
          res.json(card)
        });
    })
    .catch((err) => {
      console.error(err);
      next(new HttpError("Editing card failed, please try again", 500));
    });
};

exports.getCard = getCard;
exports.sendCard = sendCard;
exports.createCard = createCard;
exports.addCommentToCard = addCommentToCard;
exports.editCard = editCard;