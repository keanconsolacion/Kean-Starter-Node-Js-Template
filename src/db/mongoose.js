const mongoose = require("mongoose");
const { initializeAdmin } = require("../utils/adminUtils");

mongoose.connect(process.env.MONGODB_URL, (error) => {
	if (error) return console.log("MongoDB Connection Error:", error);

	console.log("Connected to MongoDB Atlas successfully.");
	initializeAdmin()
});
