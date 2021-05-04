import React from "react";

function ContinueBtn(props) {
  return (
    <button
      type="button"
      className={
        props.len === 9 ? "btn custom-btn-active" : "btn custom-btn-disabled"
      }
      disabled={props.len === 9 ? false : true}
      onClick={props.handleContine}
      data-testid="continue-btn"
    >
      Continue <i className="fas fa-angle-right" style={{ fontSize: 14 }}></i>
    </button>
  );
}

export default ContinueBtn;
