const mongoose = require("mongoose");
const connectionString = process.env.DB_URL;

mongoose.connect(connectionString);