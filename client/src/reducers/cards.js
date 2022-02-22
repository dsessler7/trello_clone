export default function cards(state = [], action) {
  switch (action.type) {
    // case "FETCH_BOARDS_SUCCESS": {
    //   return action.boards;
    // }
    // case "CREATE_BOARD_SUCCESS": {
    //   const newBoard = action.board;
    //   return state.concat(newBoard);
    // }
    case "FETCH_BOARD_SUCCESS": {
      // let lists = action.board.lists;
      let cards = [];
      console.log("action.board.lists: ", action.board.lists);
      action.board.lists.forEach(list => {
        console.log("list.cards: ", list.cards);
        cards = cards.concat(list.cards);
      });
      console.log("fetch cards: ", cards);
      return cards;
      // return action.board.lists.cards;
    }
    default:
      return state;
  }
}