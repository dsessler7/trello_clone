/* eslint-disable max-lines-per-function */
import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="card-background">
      <Link to={`/cards/${props.card._id}`}>
        <div className="card ">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {/* {props.card.labels.map(label => {
              return (
                <div className=`card-label ${label} colorblindable`></div>
              )
              })} */}
            <div className="card-label green colorblindable"></div>
            <div className="card-label yellow colorblindable"></div>
            <div className="card-label red colorblindable"></div>
            <div className="card-label orange colorblindable"></div>
            <div className="card-label blue colorblindable"></div>
            <div className="card-label purple colorblindable"></div>
            <p>
              {props.card.title}
            </p>
          </div>
          <div className="card-icons">
            <i className="clock-icon sm-icon overdue-recent completed">
              Aug 4
            </i>
            <i className="description-icon sm-icon"></i>
            {props.card.commentsCount > 0 ? <i className="comment-icon sm-icon"></i> : null}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;