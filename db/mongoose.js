const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/task-four-db")
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });