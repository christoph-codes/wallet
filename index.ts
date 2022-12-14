import express from "express";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
import routes from "./routes/index.js";
import usersRouter from "./routes/users.routes.js";
import cardsRouter from "./routes/creditCards.routes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(function (req, res, next) {
	// res.header('Access-Control-Allow-Origin', `http://localhost:3000`); // update to match the domain you will make the request from
	res.header({
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
		"Access-Control-Allow-Headers": "*",
	});
	next();
});

// app.get('*', (req, res) => {
//   res.status(200).send('Hello World!');
// });

// users route
app.use("/users", usersRouter);
// credit card route
app.use("/cards", cardsRouter);

app.use("/", routes);

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(`${__dirname}/build/index.html`));
// });

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
