const express = require('express');
const router = express.Router();
const dietController = require("../controllers/dietController");

// Add Diet
router.post('/diet',dietController.addDiet);

// Update Diet
router.put("/diet/:id", dietController.updateDiet);

// Delete Diet
router.delete("/diet/:id",dietController.deleteDiet);

// Get All Diets
router.get('/diet',  dietController.getAllDiet); 

// Get Single Diet by ID
router.get("/diet/:id",dietController.getOneDiet);

// Search Diet
router.get("/diet/search/:key", dietController.searchDiet);

module.exports = router;
