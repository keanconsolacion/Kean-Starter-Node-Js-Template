const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, (error) => {
  if (error) return console.log("MongoDB Connection Error:", error);
  console.log("Connected to MongoDB Atlas successfully.")
});
