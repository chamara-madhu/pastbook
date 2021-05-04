import axios from "axios";

import { sampleAPI } from "../resources/sampleAPI";

// get all photos
export const fetchAllPhotos = (onSuccess, onError) => {
  axios
    .get(sampleAPI)
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
    .post(`/api/photo`, data)
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
    .put(`/api/photo/${id}`, data)
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
    .get("/api/photo")
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
    .delete("/api/photo")
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error);
    });
};
