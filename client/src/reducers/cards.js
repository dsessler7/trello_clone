/* eslint-disable max-lines-per-function */
export default function cards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS": {
      let cards = [];
      action.board.lists.forEach(list => {
        cards = cards.concat(list.cards);
      });
      return cards;
    }
    case "FETCH_CARD_SUCCESS": {
      const card = state.find(card => card._id === action.card._id);
      if (card) {
        return state.map(card => {
          if (card._id === action.card._id) {
            return action.card;
          }
          return card;
        });
      } else {
        return state.concat(action.card);
      }
    }
    case "CREATE_CARD_SUCCESS": {
      return state.concat(action.card);
    }
    case "EDIT_CARD_SUCCESS": {
      return state.map(card => {
        if (card._id === action.card._id) {
          return action.card;
        }
        return card;
      });
    }
    default:
      return state;
  }
}