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
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: [true, 'Each Card must have a list.']
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'Each card must have a board id.']
  },
  position: {
    type: mongoose.Types.Decimal128,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  completed: {
    type: Boolean
  },
  archived: {
    type: Boolean
  }
});

CardSchema.set('toObject', { virtuals: true });
CardSchema.set('toJSON', { virtuals: true });

CardSchema.virtual('commentsCount').get(function() {
  return this.comments.length;
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;