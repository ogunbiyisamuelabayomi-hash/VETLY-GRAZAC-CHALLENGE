const express = require("express");
const router = express.Router();

const { createPet,
     getPets,
      updatePet,
      deletePet,
      buyPet
 } = require("../controllers/petController");

const authenticate = require("../middleware/authMiddleware");
const authenticateAdmin = require("../middleware/adminMiddleware");

router.post("/create-pet", authenticate, createPet);
router.get("/get-pets", authenticate, getPets);
router.put("/update-pet/:id", authenticate, updatePet);
router.delete("/delete-pet", authenticate, authenticateAdmin, deletePet);
router.post("/buy-pet", authenticate, buyPet)


module.exports = router;