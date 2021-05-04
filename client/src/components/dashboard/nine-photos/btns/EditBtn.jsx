import React from "react";
import { useHistory } from "react-router-dom";

function EditBtn() {
  const history = useHistory();
  return (
    <button
      type="button"
      className="btn btn-outline-secondary mr-1"
      onClick={() => history.push("/select-best-nine")}
      data-testid="edit-btn"
    >
      <i className="fas fa-pencil-alt"></i>
    </button>
  );
}

export default EditBtn;
