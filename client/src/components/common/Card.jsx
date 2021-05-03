import React from "react";
import moment from "moment";

import { PhotoProvider, PhotoConsumer } from "react-photo-view";
import "react-photo-view/dist/index.css";

import "../../styles/card.css";

function Card(props) {
  return (
    <div className="masonry-card">
      {props.isSelApplicable &&
        (props.data.isSelected ? (
          <i
            className="fas fa-check-circle active-check"
            onClick={() => props.handleSelections(props.data.id)}
          ></i>
        ) : (
          <i
            className="fas fa-check-circle deactive-check"
            onClick={() => props.handleSelections(props.data.id)}
          ></i>
        ))}

      <PhotoProvider>
        <PhotoConsumer key={props.data.id} src={props.data.picture}>
          <img
            src={props.data.picture}
            alt="photo"
            width="200"
            style={{ cursor: "zoom-in" }}
          />
        </PhotoConsumer>
      </PhotoProvider>
    </div>
  );
}

export default Card;
