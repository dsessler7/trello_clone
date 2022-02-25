/* eslint-disable max-lines-per-function */
export default function comments(state = [], action) {
  switch (action.type) {
    case "FETCH_CARD_SUCCESS": {
      return action.card.comments;
    }
    case "CREATE_COMMENT_SUCCESS": {
      return state.concat(action.comment);
    }
    default: {
      return state;
    }
  }
}