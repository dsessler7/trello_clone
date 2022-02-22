/* eslint-disable max-lines-per-function */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../actions/ListActions";

const NewList = (props) => {
  const [ showButton, setShowButton ] = useState(true);
  const [ listTitle, setListTitle ] = useState('');
  const dispatch = useDispatch();
  // const [ listSubmitted, setListSubmitted ] = useState(false);

  // useEffect(() => {
  //   dispatch(actions.createList(id));
  // }, [listSubmitted]);

  const handleSubmit = async () => {
    // create object to be sent to API
    const listObj = {
      boardId: props.boardId,
      list: {
        title: listTitle
      }
    };
    // console.log(listObj);
    await dispatch(actions.createList(listObj));
    setShowButton(true);
    setListTitle('');
  };

  return (
    <div id="new-list" className={showButton ? "new-list" : "new-list selected"}>
      <span onClick={() => setShowButton(false)}>Add a list...</span>
      <input type="text" placeholder="Add a list..." value={listTitle} onChange={(e) => setListTitle(e.target.value)} />
      <div>
        <input onClick={handleSubmit} type="submit" className="button" value="Save" />
        <i className="x-icon icon" onClick={() => setShowButton(true)}></i>
      </div>
    </div>
  );
};

export default NewList;