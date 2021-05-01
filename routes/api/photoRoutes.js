const express = require("express");
const router = express.Router();

const photoController = require("../../controllers/photoController");

// save photos
router.post("/", photoController.savePhotos);

// update photos
router.put("/:id", photoController.updatePhotos);

// read photos
router.get("/", photoController.readAllPhotos);

// delete photos
router.delete("/", photoController.deletePhotos);

module.exports = router;
