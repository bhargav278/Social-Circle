require('dotenv').config();
const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
    await mongoose.connect(DATABASE_URL);
}

module.exports = connectDB;