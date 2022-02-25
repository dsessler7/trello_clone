/* eslint-disable max-lines-per-function */
import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import * as actions from "../../actions/ListActions";

const List = (props) => {
  const [ editingTitle, setEditingTitle ] = useState(false);
  const [ listTitle, setListTitle ] = useState(props.list.title);
  const [ addCardValue, setAddCardValue ] = useState('');
  const dispatch = useDispatch();
  let addCard = props.listWithActiveAddCardForm === props.list._id;

  const cards = useSelector(state => state.cards);

  const handleToggleTitle = () => {
    setEditingTitle(!editingTitle);
  };

  const handleTitleChange = (e) => {
    e.preventDefault();
    const listObj = {
      title: listTitle
    };

    dispatch(actions.editList(props.list._id, listObj, handleToggleTitle));
  };

  const handleTitleClick = (e) => {
    setEditingTitle(true);
  };

  const checkKeyPressed = (e) => {
    if (e.key === "Enter") {
      handleTitleChange(e);
    }
  };

  const handleAddCardClick = () => {
    props.setListWithActiveAddCardForm(props.list._id);
  };

  const handleCancelAddCardClick = () => {
    props.setListWithActiveAddCardForm(null);
  };

  const handleSubmitAddCardClick = (e) => {
    e.preventDefault();
    const newCard = {
      boardId: props.list.boardId,
      listId: props.list._id,
      card: {
        title: addCardValue
      }
    };

    dispatch(actions.createCard(newCard));
    setAddCardValue('');
    props.setListWithActiveAddCardForm(null);
  };

  return (
    <div className={addCard ? "list-wrapper add-dropdown-active" : "list-wrapper"}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div onClick={handleTitleClick}>
            {editingTitle ? <input autoFocus type="text" onBlur={handleTitleChange} onKeyUp={checkKeyPressed} onChange={(e) => setListTitle(e.target.value)} className="list-title" value={listTitle} /> : <p className="list-title">{props.list.title}</p>}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id={"list-" + "-cards"}>
            {cards.filter(card => card.listId === props.list._id).map(card => {
              return (
                <Card key={card._id} card={card}/>
              );
            })}
          </div>
          <div className={addCard ? "add-dropdown add-bottom active-card" : "add-dropdown add-bottom"}>
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card" value={addCardValue} onChange={(e) => setAddCardValue(e.target.value)} ></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleSubmitAddCardClick}>Add</a>
            <i className="x-icon icon" onClick={handleCancelAddCardClick}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom" onClick={handleAddCardClick}>
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;