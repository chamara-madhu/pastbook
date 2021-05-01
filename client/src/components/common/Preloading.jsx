import React from "react";
import ReactLoading from "react-loading";

function Preloading() {
  return (
    <div className="pre-loading">
      <ReactLoading type="bubbles" color="#536687" width={80} />
    </div>
  );
}

export default Preloading;
