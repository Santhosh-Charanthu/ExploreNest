const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let ID = id.trim();
  const single = await Listing.findOne({ _id: ID })
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!single) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { single });
};

module.exports.createListing = async (req, res, next) => {
  try {
    const { title, description, price, country, location, category } =
      req.body.listing;

    if (
      !title ||
      !description ||
      !price ||
      !country ||
      !location ||
      !category
    ) {
      req.flash("error", "All fields are required.");
      return res.render("listings/new", { listing: req.body.listing });
    }

    let url = "";
    let filename = "";
    if (req.file) {
      url = req.file.path;
      filename = req.file.filename;
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let ID = id.trim();
  const single = await Listing.findOne({ _id: ID });
  if (!single) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }
  let originalImageUrl = single.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_10,w_100");
  res.render("listings/edit.ejs", { single, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  console.log(listing);

  req.flash("success", "Review Updated Successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};

module.exports.renderSearch = async (req, res) => {
  let { country } = req.query;
  if (!country || country.trim() === "") {
    return res.redirect("/listings");
  }
  let allListings = await Listing.find({
    country: { $regex: new RegExp(`^${country}$`, "i") },
  });
  if (allListings.length == 0) {
    req.flash("error", "No listings available!");
    return res.redirect("/listings");
  }

  res.render("listings/countrywise.ejs", { allListings });
};

module.exports.renderCatogeryWise = async (req, res) => {
  let { name } = req.params;
  name = name.replace(/-/g, " ");
  let allListings = await Listing.find({ category: name });
  if (allListings.length) {
    res.render("listings/category.ejs", { allListings });
  } else {
    req.flash("error", "No listings available");
    return res.redirect("/listings");
  }
};
