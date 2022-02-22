const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//import Card from 'card';

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required']
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'The Board ID is required.']
  },
  position: {
    type: mongoose.Types.Decimal128,
    required: [false, 'Position is not required.']
  },
  cards: [
    {
      type: Schema.Types.ObjectId, ref: 'Card'
    }
  ]
});

const List = mongoose.model('List', ListSchema);

module.exports = List;