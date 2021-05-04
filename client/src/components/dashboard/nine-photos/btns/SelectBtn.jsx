import React from "react";
import { useHistory } from "react-router-dom";

function SelectBtn() {
  const history = useHistory();
  return (
    <button
      type="button"
      className="btn select-now-btn"
      onClick={() => history.push("/select-best-nine")}
      data-testid="sel-btn"
    >
      <i className="fas fa-image"></i> &nbsp; Select Now
    </button>
  );
}

export default SelectBtn;
