import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { fetchSelectedPhotos, fetchAllPhotos } from "../../api/photosAPI";
import Card from "../common/Card";
import Preloading from "../common/Preloading";

import "../../styles/masona.css";

function SelectBestNineComp(props) {
  const [photos, setPhotos] = useState(
    sessionStorage.getItem("all_photos")
      ? JSON.parse(sessionStorage.getItem("all_photos"))
      : []
  );
  const [preLoading, setPreLoading] = useState(true);

  useEffect(() => {
    // get all photos
    fetchAllPhotos(
      (data) => {
        // adding isSelected object key and value (Eg. isSelected: false)
        const arr = addIsSelected(data.data.entries);
        setPhotos(arr);
        // store all photos in session storage
        sessionStorage.setItem("all_photos", JSON.stringify(arr));

        let arragedArr = [];

        // check if there selected photos in session storage
        if (sessionStorage.getItem("selected_photos")) {
          const selectedStoredPhotos = JSON.parse(
            sessionStorage.getItem("selected_photos")
          );
          arragedArr = gettingSelectedPhotos(arr, selectedStoredPhotos);

          setPhotos(arragedArr);
          setPreLoading(false);
        } else {
          fetchSelectedPhotos(
            (data) => {
              const selectedPhotos = data.data[0].photos;
              arragedArr = gettingSelectedPhotos(arr, selectedPhotos);

              setPhotos(arragedArr);
              setPreLoading(false);
            },
            (error) => {
              setPreLoading(false);
            }
          );
        }
      },
      (error) => {
        setPreLoading(false);
      }
    );
  }, []);

  // setting isSelected as default (Eg. isSelected: false)
  const addIsSelected = (data) => {
    let photoArr = [];

    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      obj["isSelected"] = false;

      photoArr.push(obj);
    }
    return photoArr;
  };

  // setting isSelected photos (Eg. isSelected: true)
  const gettingSelectedPhotos = (arr, selectedPhotos) => {
    for (let i = 0; i < selectedPhotos.length; i++) {
      arr.filter((el) => {
        if (el.id === selectedPhotos[i].id) {
          el["isSelected"] = true;
          return el;
        } else {
          return el;
        }
      });
    }
    return arr;
  };

  // function to handle selection and de-selection
  const handleSelections = (id) => {
    const filteredPhotos = photos.filter((el) => {
      if (el.id === id) {
        if (el.isSelected) {
          el["isSelected"] = false;
        } else {
          el["isSelected"] = true;
        }
      }

      return el;
    });

    setPhotos(filteredPhotos);
  };

  // get all selected photos
  const isSelected = photos.filter((el) => el.isSelected === true);

  // continue
  const handleContine = () => {
    sessionStorage.setItem("selected_photos", JSON.stringify(isSelected));
    props.history.push("/change-order");
  };

  return (
    <div className="container-cus px-0">
      <div className="row m-0">
        <div className="col p-0 con-min-height">
          {!preLoading ? (
            <>
              <div className="sticky-header">
                <h3 className="main-heading">Select Your Best 9 photos</h3>
                <p className="photo-count">Photos : {isSelected.length}</p>
                <button
                  type="button"
                  className="btn back-btn"
                  onClick={() => props.history.push("/")}
                >
                  <i className="fas fa-angle-left" style={{ fontSize: 14 }}></i>{" "}
                  Back
                </button>
                <ContinueBtn
                  len={isSelected.length}
                  handleContine={handleContine}
                />
              </div>

              <div className="grid">
                {photos.map((el, i) => (
                  <Card
                    data={el}
                    key={i}
                    handleSelections={handleSelections}
                    isSelApplicable={true}
                  />
                ))}
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

const ContinueBtn = (props) => {
  return (
    <button
      type="button"
      className={
        props.len === 9 ? "btn custom-btn-active" : "btn custom-btn-disabled"
      }
      disabled={props.len === 9 ? false : true}
      onClick={props.handleContine}
    >
      Continue <i className="fas fa-angle-right" style={{ fontSize: 14 }}></i>
    </button>
  );
};

export default withRouter(SelectBestNineComp);
