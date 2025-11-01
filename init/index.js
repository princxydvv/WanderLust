require("dotenv").config();  // Load .env first
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("✅ Connected to MongoDB!");
    } catch (err) {
        console.log("❌ MongoDB connection error:");
        console.log(err);
        process.exit(1);
    }
}

const initDB = async () => {
    try {
        // Clear old data
        await Listing.deleteMany({});
        console.log("🗑️ Old listings deleted");

        // Replace THIS with your REAL user ID from your DB
        const ownerId = "YOUR_REAL_USER_ID_HERE";

        const formattedData = initData.data.map((obj) => ({
            ...obj,
            owner: new mongoose.Types.ObjectId(ownerId),
            geometry: {
                type: "Point",
                coordinates: obj.coordinates
            }
        }));

        await Listing.insertMany(formattedData);
        console.log("✅ Database seeded successfully!");

        process.exit(); // Close script cleanly
    } catch (err) {
        console.log("❌ Error during seeding:");
        console.log(err);
        process.exit(1);
    }
};

main().then(initDB);
