import axios from "axios";

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
