const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  dueDate: Date,
  labels: [
    {
      type: String
    }
  ],
  description: {
    type: String,
    required: [true, 'The Card must have a description.']
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: [true, 'Each Card must have a list.']
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'Each Card must have a board.']
  },
  position: {
    type: mongoose.Types.Decimal128,
    required: [true, 'Position is required.']
  },
  // commentsCount: {
  //   type: Number,
  //   required: [true, 'Comment count required.']
  // }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;