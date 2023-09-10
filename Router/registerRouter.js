const mongoose = require('mongoose');
const express = require('express');
const registerSchema = require('../Schema/registerRouterSchema');
const user = mongoose.model("user", registerSchema);
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/register', async (req, res) => {
    try {
        bcrypt.hash(req.body.password, saltRounds,async function (err, hash) {
             const newUser = new user({
                email: req.body.email,
                password: hash
            })
            await newUser.save()
            res.status(201).json(newUser);
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRecord = await user.findOne({ email: email });

        if (!userRecord) {
            
            return res.status(404).json({ error: "Email or password did not match" });
        }
        const passwordMatch = await bcrypt.compare(password, userRecord.password);

        if (passwordMatch) {
            return res.status(200).json({ message: "Authenticated user" });
        } else {
            return res.status(401).json({ error: "Email or password did not match" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


module.exports = router;



