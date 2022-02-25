const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: [true, 'The Comment text is required']
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
    required: [true, 'Each Comment must have a card.']
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;