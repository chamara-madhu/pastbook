import React from "react";

import Close from "../../images/close-white.png";

function ConfirmModal(props) {
  return (
    <div
      className="modal fade"
      id="confirmModal"
      tabIndex="-1"
      aria-labelledby="confirmModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmModalLabel">
              Are you sure?
            </h5>

            <img
              src={Close}
              alt="close"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              width="50px"
              style={{ cursor: "pointer" }}
              id="confirmModalClose"
            />
          </div>
          <div className="modal-body">
            <p>Do you want to remove all photos?</p>
          </div>
          <div className="modal-footer border-0 p-2">
            <button type="button" className="btn" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={props.handleDelete}
              style={{ width: 115 }}
            >
              {props.loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Remove All"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
