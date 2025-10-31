require("dotenv").config();  // ✅ load .env first
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
    // await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: new mongoose.Types.ObjectId("68d51ccf8e5579a86b6539bf"),
        geometry: {
            type: "Point",
            coordinates: obj.coordinates
        }
    }));

    // await Listing.insertMany(initData.data);
    console.log("data was initialized");
}
initDB();
