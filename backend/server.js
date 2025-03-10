const express = require('express');
const mongoose= require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("./model/User.js");


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(err);
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        const hachedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hachedPassword,
        });

        await newUser.save();
        res.status(201).json({message: "User registered"});
    } catch (err) {
        res.status(500).json({message: "server error"});
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            email,
        }); 
        if(!user) {
            return res.status(400).json({message: "User does not exist"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token, user: {id: user._id, name: user.name, email: user.email}});
    } catch (err) {
        res.status(500).json({message: "server error"});
    }
}
);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});