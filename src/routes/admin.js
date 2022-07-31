const router = require("express").Router();
const bcrypt = require("bcrypt");
const Admin = require("../model/Admin");
const auth = require("../middleware/auth");

router.post("/account", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).send("Insufficient data received");
	try {
		const admin = new Admin({ email, password });
		await admin.save();
		const token = await admin.generateAuthToken();
		res.cookie("auth-token", token, { httpOnly: true }); //Save jwt in http only cookie
		res.status(201).send("Admin created successfully.");
	} catch (error) {
		if (error.code === 11000) return res.status(400).send({ error: "This email has already been used" });
		console.log(error);
		res.status(400).send({ error: `Failed to create admin. password must be 7 characters or higher` });
	}
});

//For change passwords only
router.patch("/account", auth, async (req, res) => {
	const allowedUpdates = ["password"];
	const updates = Object.keys(req.body);

	if (!updates.every((update) => allowedUpdates.includes(update))) res.status(403).send({ error: "Invalid body" });

	for (update of updates) {
		req.admin[update] = req.body[update];
	}

	await req.admin.save();
	res.send(req.admin);
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).send("Email or password not found");
	try {
		const admin = await Admin.findOne({ email: email }); // Check if admin exist
		if (!admin) return res.status(404).send({ error: "Email does not exist" }); // Email does not exist
		const isMatched = await bcrypt.compare(password, admin.password);
		if (isMatched) {
			// Authentication successful
			const token = await admin.generateAuthToken();
			res.cookie("auth-token", token, { httpOnly: true }); // Save jwt in http only cookie
			res.send("Logged in successfully");
		} else {
			res.status(400).send({ error: "Email or password is incorrect" });
		}
	} catch (error) {
		res.status(400).send();
	}
});

router.post("/logout", auth, async (req, res) => {
	// Remove admin's token in the db
	req.admin.tokens = req.admin.tokens.filter((token) => {
		return token.token !== req.token;
	});
	await req.admin.save();

	// Expire the user's token in the user's browser
	res.cookie("auth-token", "", { maxAge: 60 * 60 * 1000 });
	res.send();
});

router.get(
	"/authStatus",
	auth,
	(req, res) => res.status(200).send({ isSignedIn: true }),
	(error, req, res, next) => {
		res.status(401).send({ isSignedIn: false });
	}
);

module.exports = router;
