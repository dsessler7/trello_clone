/* eslint-disable max-len */
import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, card: card };
}

export function createCommentSuccess(comment) {
  return { type: types.CREATE_COMMENT_SUCCESS, comment };
}

export function editCardSuccess(card) {
  return { type: types.EDIT_CARD_SUCCESS, card };
}

export function fetchCard(id) {
  return function(dispatch) {
    apiClient.getCard(id, data => dispatch(fetchCardSuccess(data)));
  };
}

export function createComment(newCommentObj) {
  return function(dispatch) {
    apiClient.createComment(newCommentObj, data => dispatch(createCommentSuccess(data)));
  };
}

export function editCard(id, cardObj) {
  return function(dispatch) {
    apiClient.editCard(id, cardObj, data => dispatch(editCardSuccess(data)));
  };
}

