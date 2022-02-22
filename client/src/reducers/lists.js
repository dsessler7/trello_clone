/* eslint-disable max-lines-per-function */
export default function lists(state = [], action) {
  switch (action.type) {
    // case "FETCH_BOARDS_SUCCESS": {
    //   return action.boards;
    // }
    // case "CREATE_BOARD_SUCCESS": {
    //   const newBoard = action.board;
    //   return state.concat(newBoard);
    // }
    case "FETCH_BOARD_SUCCESS": {
      //let lists = action.board.lists;
      let lists = action.board.lists.map(list => {
        const { _id, title, boardId, position} = list;
        return {_id, title, boardId, position};
      });
      return lists;
    }
    case "CREATE_LIST_SUCCESS": {
      return state.concat(action.list);
    }
    case "EDIT_LIST_SUCCESS": {
      return state.map(list => {
        if (list._id === action.list._id) {
          return action.list;
        } else {
          return list;
        }
      });
    }
    default:
      return state;
  }
}