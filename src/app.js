const express = require("express");
const cookieParser = require("cookie-parser");

const adminRoute = require("./routes/admin");

const app = express();
const port = process.env.PORT || 3080;

app.use(express.json());
app.use(cookieParser());

app.use("/admin", adminRoute);

require("./db/mongoose");
app.listen(port, () => console.log(`Server started at port ${port}`));
