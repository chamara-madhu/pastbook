const Photo = require("../models/photoModel");

// save photos
exports.savePhotos = (req, res) => {
  const photo = new Photo({ photos: req.body });
  // save to database
  photo
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ code: 1000, message: "Photos are not saved successfully" });
    });
};

// update photos
exports.updatePhotos = (req, res) => {
  if (req.params.id) {
    Photo.findOne({ _id: req.params.id })
      .exec()
      .then((photo) => {
        photo.photos = req.body;
        // save to database
        photo
          .save()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            console.log("error");
            errors.fail = "Photos are not saved successfully";
            res.status(400).json(errors);
          });
      })
      .catch((err) => {
        console.log("errorcsdfs");
        res.status(400).json({ error: err });
      });
  }
};

// read all photos
exports.readAllPhotos = (req, res) => {
  Photo.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// delete all photos
exports.deletePhotos = (req, res) => {
  Photo.deleteMany()
    .exec()
    .then((result) => {
      res.status(200).json({ code: 1000, message: "Photos deleted" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
