// Currently the DB connection lives in server.js for simplicity.
// As the app grows, move it here and import it into server.js.
// Example future content:
//
// const mongoose = require('mongoose');
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('✓ MongoDB connected');
//   } catch (err) {
//     console.error('✗ MongoDB connection failed:', err.message);
//     process.exit(1);
//   }
// };
// module.exports = connectDB;

import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`I did what i did ${conn.connection.host}`);
  } catch (error) {
    console.log(`I did something ${error.message}`);
    process.exit();
  }
};
export default connectdb;
