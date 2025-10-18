const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection
const uri = "mongodb+srv://admin:Udaysai123@cluster0.kuoxmmb.mongodb.net/registerDB?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Connection error:", err));

// Simple GET / route for testing
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

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

  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send("User already exists");

  const user = new User({ name, email, password });
  await user.save();

  res.send("User registered successfully");
});

// Use Render's dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
