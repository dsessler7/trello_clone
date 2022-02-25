import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchListsRequest() { //using this in board
  return { type: types.FETCH_BOARDS_REQUEST };
}

export function fetchBoardsSuccess(boards) { //using this in board?
  return { type: types.FETCH_BOARDS_SUCCESS, boards };
}

export function editListSuccess(list) {
  return { type: types.EDIT_LIST_SUCCESS, list };
}

export function createListSuccess(list) {
  return { type: types.CREATE_LIST_SUCCESS, list: list };
}

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card: card};
}

export function createList(list, callback) {
  return function(dispatch) {
    apiClient.createList(list, data => {
      dispatch(createListSuccess(data));

      if (callback) {
        callback(data);
      }
    });
  };
}

export function editList(id, list, callback) {
  return function(dispatch) {
    apiClient.editList(id, list, data => {
      dispatch(editListSuccess(data));

      if (callback) {
        callback();
      }
    });
  };
}

export function createCard(card) {
  return function(dispatch) {
    apiClient.createCard(card, data => dispatch(createCardSuccess(data)));
  };
}