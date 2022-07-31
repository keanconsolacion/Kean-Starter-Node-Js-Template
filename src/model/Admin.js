const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Email is invalid");
				}
			},
		},
		password: {
			type: String,
			required: true,
			minlength: 7,
			trim: true,
			validate(value) {},
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

//Generate JWT
adminSchema.methods.generateAuthToken = async function () {
	const admin = this;
	const token = jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET);
	admin.tokens = admin.tokens.concat({ token });
	await admin.save();
	return token;
};

// Hash the plain text password before saving
adminSchema.pre("save", async function (next) {
	const admin = this;
	if (admin.isModified("password")) {
		admin.password = await bcrypt.hash(admin.password, 8);
	}
	next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
