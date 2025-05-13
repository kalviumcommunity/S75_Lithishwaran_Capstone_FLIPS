const mongoose = require("mongoose");

const designerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    brandName: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }    
});

const Designer = mongoose.model("Designer", designerSchema );

module.exports = Designer;