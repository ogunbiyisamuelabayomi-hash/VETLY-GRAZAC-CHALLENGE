const express = require ("express");
const{ registerUser, loginUser } = require ("../controllers/userController");
const authenticate = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/test-auth", authenticate, (req, res) => {
    return res.status(200).json({
        message: "Authentication successful",
        user: req.user
    });
});








module.exports = router;