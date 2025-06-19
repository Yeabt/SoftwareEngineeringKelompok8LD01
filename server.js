const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./backend/routes/auth'); // ← Import route

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/SmartSpend', {
  useNewUrlParser: true, useUnifiedTopology: true,
});

// Use your route
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));
