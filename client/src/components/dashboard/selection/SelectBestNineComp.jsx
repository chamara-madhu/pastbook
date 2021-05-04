import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { fetchSelectedPhotos, fetchAllPhotos } from "../../../api/photosAPI";
import Card from "../../common/card/Card";
import Preloading from "../../common/Preloading";
import ContinueBtn from "./continue-btn/ContinueBtn";

function SelectBestNineComp(props) {
  const [photos, setPhotos] = useState(
    sessionStorage.getItem("all_photos")
      ? JSON.parse(sessionStorage.getItem("all_photos"))
      : []
  );
  const [preLoading, setPreLoading] = useState(true);
  const history = useHistory();

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

    data.forEach((el) => {
      const obj = el;
      obj["isSelected"] = false;

      photoArr = [...photoArr, obj];
    });
    return photoArr;
  };

  // setting isSelected photos (Eg. isSelected: true)
  const gettingSelectedPhotos = (arr, selectedPhotos) => {
    selectedPhotos.forEach((sel) => {
      arr.filter((el) => {
        if (el.id === sel.id) {
          el["isSelected"] = true;
          return el;
        } else {
          return el;
        }
      });
    });

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

  if (isSelected.length > 0) {
    sessionStorage.setItem("selected_photos", JSON.stringify(isSelected));
  }

  // continue
  const handleContine = () => {
    sessionStorage.setItem("selected_photos", JSON.stringify(isSelected));
    history.push("/change-order");
  };

  return (
    <div className="container-cus px-0">
      <div className="row m-0">
        <div className="col p-0 con-min-height">
          {!preLoading ? (
            <>
              <div className="sticky-header">
                <h3 className="main-heading" data-testid="photo-counter">
                  Select Your Best 9 photos
                </h3>
                <p className="photo-count" data-testid="photos-count">
                  Photos : {isSelected.length}
                </p>
                <button
                  type="button"
                  className="btn back-btn"
                  onClick={() => history.push("/")}
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

export default SelectBestNineComp;
