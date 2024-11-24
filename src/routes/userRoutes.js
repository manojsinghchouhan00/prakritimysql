const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController.js");

// Login Route
router.post("/login", userController.loginUser);

// Get All Users
router.get("/user", userController.getAllUser);

// Create User
router.post('/user', userController.addUser);


// Update User
router.put("/user/:id", userController.updateUser);

// // Delete User
router.delete("/user/:id", userController.deleteUser);

// Get Single User by ID
router.get("/user/:id", userController.getOneUser);

// Search User by key
router.get("/user/search/:key", userController.searchUser);


module.exports = router;
