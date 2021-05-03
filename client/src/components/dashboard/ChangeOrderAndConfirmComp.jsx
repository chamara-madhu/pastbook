import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

import {
  fetchSelectedPhotos,
  savePhotos,
  updatePhotos,
} from "../../api/photosAPI";
import CardOrder from "../common/CardOrder";

import Preloading from "../common/Preloading";
import "../../styles/masona.css";

function ChangeOrderAndConfirmComp(props) {
  const [id, setId] = useState("");
  const [selPhotos, setSelPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preLoading, setPreLoading] = useState(true);

  useEffect(() => {
    setSelPhotos(JSON.parse(sessionStorage.getItem("selected_photos")));

    // get all saved photos from DB
    fetchSelectedPhotos(
      (data) => {
        setId(data.data[0]._id);
        setPreLoading(false);
      },
      (error) => {
        setPreLoading(false);
      }
    );
  }, []);

  // handle drag and drop
  const handleRLDDChange = (reorderedItems) => {
    setSelPhotos(reorderedItems);
  };

  // handle save photos in the DB
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    savePhotos(
      selPhotos,
      (data) => {
        setLoading(false);
        sessionStorage.removeItem("selected_photos");
        props.history.push("/");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  // handle update photos in the DB
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    updatePhotos(
      id,
      selPhotos,
      (data) => {
        setLoading(false);
        sessionStorage.removeItem("selected_photos");
        props.history.push("/");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="container-cus px-0">
      <div className="row m-0">
        <div className="col p-0 con-min-height">
          {!preLoading ? (
            <>
              <div className="sticky-header">
                <h3 className="main-heading">Arrange Your Photos</h3>
                <p className="text-center">
                  Drag and drop to arrange your photos and save.
                </p>
                <button
                  type="button"
                  className="btn back-btn"
                  onClick={() => props.history.push("/select-best-nine")}
                >
                  <i className="fas fa-angle-left" style={{ fontSize: 14 }}></i>{" "}
                  Back
                </button>
                <button
                  type="button"
                  className="btn custom-btn-active"
                  onClick={id ? handleUpdate : handleSave}
                  disabled={loading ? true : false}
                >
                  {loading ? (
                    <>
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Loading...</span>
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
              <div className="grid-order">
                <RLDD
                  cssClasses="example"
                  items={selPhotos}
                  itemRenderer={CardOrder}
                  onChange={handleRLDDChange}
                />
              </div>
            </>
          ) : (
            <Preloading />
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(ChangeOrderAndConfirmComp);
