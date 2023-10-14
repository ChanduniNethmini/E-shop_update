//Load modules
const dotenv = require("dotenv");
dotenv.config();
const configurationManager = require("./src/config/api.config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const logger = require("./src/utils/logger");
//Create the Express App
const app = express();
const csurf = require("csurf"); // Import the csurf middleware- IT20217990

//Importing routes

//Order Routes
const orderRoutes = require("./src/routes/order.service.routes");

//Authentication Routes
const routAuthentication = require("./src/routes/authentication.route");

//Payment Routes

//Delivery Service Routes
const deliveryServiceRoute = require("./src/routes/delivery.service.routes");
//Setup Request body JSON Parsing
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Enable All CORS Requests
app.use(cors());

app.use(helmet());

// Configure Services

//Authentication Services
app.use(routAuthentication);

//Order Services
app.use(orderRoutes);

//Delivery Services
app.use("/api/deleveryService", require("./src/routes/delivery.service.routes"));
app.use("/api/message", require("./src/routes/messages.routes"));
app.use("/api/dashboard", require("./src/routes/dashboard.routes"));
app.use("/api/report", require("./src/routes/pdf.report.generate.manager.routes"));

// Enable CSRF protection
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// route handler with CSRF token verification
app.post("/submit", (req, res) => {
	// Verify CSRF token
	if (!req.csrfToken() || req.csrfToken() !== req.body._csrf) {
		return res.status(403).send("CSRF token validation failed.");
	}

	// Process the form submission
	const formData = req.body;

	// save data to MongoDB
	const newRecord = new MyModel(formData);
	newRecord.save((err, savedRecord) => {
		if (err) {
			console.error(err);
			return res.status(500).send("Error saving data.");
		}
		// Data saved successfully
		res.status(200).send("Form submitted and data saved successfully.");
	});
});

app.get("/", (request, response) => {
	response.send("<h3>🖥️ Welcome API Documentation</h3>");
});

const port = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;

//establishing Database connection
mongoose
	.connect(DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("DB is connected");
	})
	.catch((err) => console.log("DB connection err", err));

app.listen(port, () => {
	logger.info(`Web API Development: ${port}`);
});

/*npm run local:server*/
