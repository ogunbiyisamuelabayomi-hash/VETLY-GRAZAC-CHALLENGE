const express = require("express");
const dotenv = require ("dotenv");
const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");
const createAdmin = require("./seeders/adminSeeder")


const app = express();
dotenv.config();
createAdmin();


app.use (express.json());

app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);


app.get("/", (req, res) => {
    return res.send("Welcome to Vetly homepage")
});


module.exports = app;