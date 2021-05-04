import { useState, useEffect } from "react";
import moment from "moment";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import {
  fetchSelectedPhotos,
  deleteStoredPhotos,
} from "../../../api/photosAPI";
import Card from "../../common/card/Card";
import ConfirmModal from "../../modals/ConfirmModal";
import Preloading from "../../common/Preloading";
import SelectEditDeleteBtns from "./btns/SelectEditDeleteBtns";

function NinePhotosComp(props) {
  const [photos, setPhotos] = useState([]);
  const [updatedOn, setUpdatedOn] = useState("");
  const [loading, setLoading] = useState(false);
  const [preLoading, setPreLoading] = useState(true);

  useEffect(() => {
    // remove stored selected_photos in session storage
    sessionStorage.removeItem("selected_photos");

    // get all saved photos from DB
    fetchSelectedPhotos(
      (data) => {
        sessionStorage.setItem(
          "saved_photos",
          JSON.stringify(data.data[0].photos)
        );
        setUpdatedOn(data.data[0].createdAt);
        setPhotos(data.data[0].photos);
        setPreLoading(false);
      },
      (error) => {
        setPreLoading(false);
      }
    );
  }, []);

  // handle delete all photos from database
  const handleDelete = () => {
    setLoading(true);
    deleteStoredPhotos(
      (data) => {
        setPhotos([]);
        setUpdatedOn("");
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
                  {photos.length > 0 ? (
                    <p className="text-center" style={{ fontSize: 13 }}>
                      Last update :{" "}
                      {moment(updatedOn).format("MMM Do YYYY hh:mm a")}
                    </p>
                  ) : (
                    <p className="text-center" style={{ fontSize: 13 }}>
                      Now you can choose your best 9 photos.
                    </p>
                  )}

                  <SelectEditDeleteBtns photosLen={photos.length} />
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

export default NinePhotosComp;
