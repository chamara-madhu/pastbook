import React from "react";
import moment from "moment";

import "../../styles/card.css";

function CardOrder(item, index) {
  return (
    <div className="masonry-card" style={{ cursor: "grab" }}>
      <img src={item.picture} alt="photo" width="200" />
    </div>
  );
}

export default CardOrder;
