import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import { fetchSelectedPhotos, deleteStoredPhotos } from "../../api/photosAPI";
import Card from "../common/Card";
import ConfirmModal from "../modals/ConfirmModal";
import Preloading from "../common/Preloading";

import "../../styles/masona.css";

function DashboardComp(props) {
  const [photos, setPhotos] = useState([]);
  const [updatedOn, setUpdatedOn] = useState("");
  const [loading, setLoading] = useState(false);
  const [preLoading, setPreLoading] = useState(true);

  useEffect(() => {
    sessionStorage.removeItem("selected_photos");
    fetchSelectedPhotos(
      (data) => {
        setUpdatedOn(data.data[0].createdAt);
        setPhotos(data.data[0].photos);
        setPreLoading(false);
      },
      (error) => {
        setPreLoading(false);
      }
    );
  }, []);

  const handleDelete = () => {
    setLoading(true);
    deleteStoredPhotos(
      (data) => {
        setPhotos([]);
        setLoading(false);
        NotificationManager.success("Removed!", "Success");
        document.getElementById("confirmModalClose").click();
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <>
      <div className="container-cus px-0">
        <div className="row m-0">
          <div className="col p-0 con-min-height">
            {!preLoading ? (
              <>
                <div className="sticky-header">
                  <h3 className="main-heading">Your Best 9 Photos</h3>
                  {updatedOn ? (
                    <p className="text-center" style={{ fontSize: 13 }}>
                      Last update :{" "}
                      {moment(updatedOn).format("MMM Do YYYY hh:mm a")}
                    </p>
                  ) : (
                    <p className="text-center" style={{ fontSize: 13 }}>
                      Now you can choose your best 9 photos.
                    </p>
                  )}

                  {photos.length > 0 ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-outline-secondary mr-1"
                        onClick={() => props.history.push("/select-best-nine")}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger ml-1"
                        data-toggle="modal"
                        data-target="#confirmModal"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn select-now-btn"
                      onClick={() => props.history.push("/select-best-nine")}
                    >
                      <i className="fas fa-image"></i> &nbsp; Select Now
                    </button>
                  )}
                </div>

                <div className="grid">
                  {photos.map((el, i) => (
                    <Card data={el} key={i} isSelApplicable={false} />
                  ))}
                </div>
              </>
            ) : (
              <Preloading />
            )}
          </div>
        </div>
      </div>
      <ConfirmModal handleDelete={handleDelete} loading={loading} />
      <NotificationContainer />
    </>
  );
}

export default withRouter(DashboardComp);
