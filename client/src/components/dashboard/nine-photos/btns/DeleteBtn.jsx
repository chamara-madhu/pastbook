import React from "react";

function DeleteBtn() {
  return (
    <button
      type="button"
      className="btn btn-outline-danger ml-1"
      data-toggle="modal"
      data-target="#confirmModal"
      data-testid="del-btn"
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
}

export default DeleteBtn;
