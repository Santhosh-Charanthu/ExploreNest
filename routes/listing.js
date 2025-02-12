const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  validateObjectId,
} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
  );

//Creating new
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(validateObjectId, wrapAsync(listingController.showListing))
  .put(
    validateObjectId,
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    validateObjectId,
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

router.route("/country/:country").get(listingController.renderSearch);

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

router.get("/category/:name", listingController.renderCatogeryWise);

module.exports = router;
