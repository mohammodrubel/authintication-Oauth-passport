const mongoose = require('mongoose');
const express = require('express');
const registerSchema = require('../Schema/registerRouterSchema');
const user = mongoose.model("user", registerSchema);
const router = express.Router();
const md5 = require('md5')



router.post('/register', async (req, res) => {
    
    try {
        const addUser = new user({
            email:req.body.email,
            password:md5(req.body.password)
        }); // Create a new instance of the register model
        const savedUser = await addUser.save(); // Save the new user to the database
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email 
        const password = md5(req.body.password) 
        const users = await user.findOne({ email: email });

        if (users && password === password) {
            res.status(200).json({ user: "authenticated user" });
        } else {
            res.status(404).json({ user: "email or password did not match" });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;

