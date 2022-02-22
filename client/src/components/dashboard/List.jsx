/* eslint-disable max-lines-per-function */
import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import * as actions from "../../actions/ListActions";

const List = (props) => {
  const [ editingTitle, setEditingTitle ] = useState(false);
  const [ listTitle, setListTitle ] = useState(props.list.title);
  const dispatch = useDispatch();

  const cards = useSelector(state => state.cards);
  // console.log("cards ", cards);

  const handleTitleChange = async (e) => {
    e.preventDefault();
    const listObj = {
      title: listTitle
    };
    console.log(props.list._id);

    await dispatch(actions.editList(props.list._id, listObj));
    setEditingTitle(false);
  };

  const handleTitleClick = (e) => {
    setEditingTitle(true);
  };

  const checkKeyPressed = (e) => {
    if (e.key === "Enter") {
      handleTitleChange(e);
    }
  };

  return (
    <div className="list-wrapper">
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
        </div>
      </div>
    </div>
  );
};

export default List;