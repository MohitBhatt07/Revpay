const express = require('express');
const dotenv = require('dotenv');
const businessRoutes = require('./routes/businessRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const { connectDB, initializeDatabase } = require('./config/database');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

//routes
app.use('/api/business', businessRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transaction', transactionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});