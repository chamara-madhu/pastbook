import React from "react";

function CardOrder(item, index) {
  return (
    <div className="masonry-card" style={{ cursor: "grab" }}>
      <img src={item.picture} alt={`p${index}`} width="200" />
    </div>
  );
}

export default CardOrder;
