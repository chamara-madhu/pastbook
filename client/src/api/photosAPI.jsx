import axios from "axios";

// get all photos
export const fetchAllPhotos = (onSuccess, onError) => {
  axios
    .get(
      "https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json"
    )
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error);
    });
};

// save photos at first time
export const savePhotos = (data, onSuccess, onError) => {
  axios
    .post(`http://localhost:5000/api/photo`, data)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error);
    });
};

// update photos
export const updatePhotos = (id, data, onSuccess, onError) => {
  axios
    .put(`http://localhost:5000/api/photo/${id}`, data)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error);
    });
};

// get saved photos from DB
export const fetchSelectedPhotos = (onSuccess, onError) => {
  axios
    .get("http://localhost:5000/api/photo")
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error);
    });
};

// delete all photos
export const deleteStoredPhotos = (onSuccess, onError) => {
  axios
    .delete("http://localhost:5000/api/photo")
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error);
    });
};
