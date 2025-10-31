const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define review schema
const reviewSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("Review", reviewSchema);
