/* eslint-disable max-lines-per-function */
export default function boards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARDS_SUCCESS": {
      return action.boards;
    }
    case "CREATE_BOARD_SUCCESS": {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    case "FETCH_BOARD_SUCCESS": {
      //let lists = action.board.lists;
      return [action.board];
    }
    case "CREATE_LIST_SUCCESS": {
      return state.map(board => {
        if (board._id === action.list.boardId) {
          board.lists = board.lists.concat(action.list);
        }
        return board;
      });
    }
    case "EDIT_LIST_SUCCESS": { // LEFT OFF HERE!!
      return state.map(board => {
        if (board._id === action.list.boardId) {
          return board.lists.map(list => {
            if (list._id === action.list._id) {
              return action.list;
            }
            return list;
          });
        }
        return board;
      });
    }
    default:
      return state;
  }
}
