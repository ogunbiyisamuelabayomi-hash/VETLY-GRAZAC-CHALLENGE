const dotenv = require ("dotenv");
dotenv.config();

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");
const createAdmin = require("./seeders/adminSeeder")


const app = express();

createAdmin();


app.use (express.json());

app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);


app.get("/", (req, res) => {
    return res.send("Welcome to Vetly homepage")
});


module.exports = app;