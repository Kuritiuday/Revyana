// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection
const uri = "mongodb+srv://admin:Udaysai123@cluster0.kuoxmmb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // replace with your connection string
mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Connection error:", err));


// User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Register route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send("User already exists");
    }

    // Save new user
    const user = new User({ name, email, password });
    await user.save();

    res.send("User registered successfully");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
