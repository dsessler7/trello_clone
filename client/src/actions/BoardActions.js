import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchBoardsRequest() {
  return { type: types.FETCH_BOARDS_REQUEST };
}

export function fetchBoardsSuccess(boards) {
  return { type: types.FETCH_BOARDS_SUCCESS, boards };
}

export function createBoardRequest() {
  return { type: types.CREATE_BOARD_REQUEST };
}

export function createBoardSuccess(board) {
  return { type: types.CREATE_BOARD_SUCCESS, board: board };
}

export function fetchBoardRequest() {
  return { type: types.FETCH_BOARD_REQUEST };
}

export function fetchBoardSuccess(board) {
  return { type: types.FETCH_BOARD_SUCCESS, board };
}

export function fetchBoards() {
  return function(dispatch) {
    dispatch(fetchBoardsRequest()); // not necessary but is used if you wanted to implement a spinner while loading
    apiClient.getBoards(data => dispatch(fetchBoardsSuccess(data.boards)));
  };
}

export function createBoard(board, callback) {
  return function(dispatch) {
    dispatch(createBoardRequest());
    apiClient.createBoard(board, data => {
      dispatch(createBoardSuccess(data.board));

      if (callback) {
        callback(data.board);
      }
    });
  };
}

export function fetchBoard(id) {
  return function(dispatch) {
    apiClient.getBoard(id, data => dispatch(fetchBoardSuccess(data)));
  };
}