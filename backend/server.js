require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const appRoutes = require("./routes/appRoutes");


const URI = process.env.MONGODB_URI;
mongoose.connect(URI)
.then( () => { console.log("Database connected successfully")})
.catch ( (error) => { console.log("Failed to connect database", error)});

app.use(express.json());

app.use("/api",appRoutes);

const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

