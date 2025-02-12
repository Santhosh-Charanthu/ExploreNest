const mongoose = require("mongoose");
const Listing = require("../models/listing.js")
const initData = require("./data.js");

const url="mongodb+srv://santhosh:santhosh981@cluster0.whu02.mongodb.net/crud";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
}); 

async function main() {
    await mongoose.connect(url);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6784c245b6f4a5e97d33cbe9"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();