const Comment = require("../models/comment");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createComment = (req, res, next) => {
  const errors = validationResult(req);
  const newComment = {
    cardId: req.body.cardId,
    text: req.body.comment.text
  };

  if (errors.isEmpty()) {
    Comment.create(newComment)
      .then((comment) => {
        req.comment = comment;
        next();
      })
      .catch((err) => {
        console.error();(err);
        next(new HttpError("Creating comment failed, please try again", 500))
      });

  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const sendComment = (req, res, next) => {
  res.json(req.comment);
};

exports.createComment = createComment;
exports.sendComment = sendComment;