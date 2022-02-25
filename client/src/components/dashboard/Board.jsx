/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "./List";
import * as actions from "../../actions/BoardActions";
import { useParams } from "react-router-dom";
import NewList from "./NewList";


const Board = () => {
  const boards = useSelector((state) => state.boards);
  const lists = useSelector((state) => state.lists);
  const cards = useSelector((state) => state.cards);
  const [ listWithActiveAddCardForm, setListWithActiveAddCardForm ] = useState(null);

  function getBoardId(path, id) {
    if (path === 'boards') {
      return id;
    } else if (path === 'cards') {
      // if cards is empty, return null
      let card = cards.find(card => card._id === id);
      if (card) {
        return card.boardId;
      }
    }

    return null;
  }

  let { 0: path, id } = useParams();
  let boardId = getBoardId(path, id);

  const board = boards.find(board => board._id === boardId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (boardId) {
      dispatch(actions.fetchBoard(boardId));
    }
  }, [boardId, dispatch]);

  if (!board) {
    return null;
  }
  return (
    <>
      <header>
        <ul>
          <li id="title">{board.title}</li>
          <li className="star-icon icon"></li>
          <li className="private private-icon icon">Private</li>
        </ul>
        <div className="menu">
          <i className="more-icon sm-icon"></i>Show Menu
        </div>
        <div className="subscribed">
          <i className="sub-icon sm-icon"></i>Subscribed
        </div>
      </header>
      <main>
        <div id="list-container" className="list-container">
          <div id="existing-lists" className="existing-lists">
            {lists.map(list => {
              return (
                <List key={list._id} list={list} listWithActiveAddCardForm={listWithActiveAddCardForm} setListWithActiveAddCardForm={setListWithActiveAddCardForm} />
              );
            })}
          </div>
          <NewList boardId={id} />
        </div>
      </main>
    </>
  );
};

export default Board;
