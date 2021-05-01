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
    fetchAllPhotos(
      (data) => {
        const arr = addIsSelected(data.data.entries);
        setPhotos(arr);
        sessionStorage.setItem("all_photos", JSON.stringify(arr));

        fetchSelectedPhotos(
          (data) => {
            const selectedPhotos = data.data[0].photos;
            let arragedArr = [];

            for (let i = 0; i < selectedPhotos.length; i++) {
              arragedArr = arr.filter((el) => {
                if (el.id === selectedPhotos[i].id) {
                  el["isSelected"] = true;
                  return el;
                } else {
                  return el;
                }
              });
            }

            setPhotos(arragedArr);
            setPreLoading(false);
          },
          (error) => {
            setPreLoading(false);
          }
        );
      },
      (error) => {
        setPreLoading(false);
      }
    );
  }, []);

  const addIsSelected = (data) => {
    let photoArr = [];

    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      obj["isSelected"] = false;

      photoArr.push(obj);
    }
    return photoArr;
  };

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

  const isSelected = photos.filter((el) => el.isSelected === true);

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
                <p className="text-center">Photos : {isSelected.length}</p>
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
