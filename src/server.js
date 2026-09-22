const dotenv = require ("dotenv");
dotenv.config();

const app = require ("./app");
const connectDB = require("./db/database");

const PORT = process.env.PORT || 4620;

const runServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Vetly server is up and running on port ${PORT}`);
    });
};

runServer()