const Admin = require("../model/Admin");

const initializeAdmin = async () => {
	const { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } = process.env;
	const admins = await Admin.findOne();
	if (!admins) {
		console.log(`Instantiated an admin user: ${DEFAULT_ADMIN_PASSWORD}`);
		const admin = new Admin({ email: DEFAULT_ADMIN_EMAIL, password: DEFAULT_ADMIN_PASSWORD });
		await admin.save();
	}
};

module.exports = {
	initializeAdmin,
};
