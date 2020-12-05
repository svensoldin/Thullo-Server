const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

//connect db
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
const mongooseConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
		console.log("Connected to DB");
	} catch (err) {
		console.error(err);
	}
};
mongooseConnect();

// Routes
app.get("/test", (req, res) => {
	res.status(200).json({ message: "Pass!" });
});
app.use("/users", require("./routes/users"));
app.use("/boards", require("./routes/boards"));
app.use("/columns", require("./routes/columns"));
app.use("/cards", require("./routes/cards"));

module.exports = app;
