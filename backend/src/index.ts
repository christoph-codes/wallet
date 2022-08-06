import express from 'express';
import routes from './routes/index.js';
import usersRouter from './routes/users.routes.js';

const app = express();
const port = 5000;

app.use(express.json())

app.use(function (req, res, next) {
	// res.header('Access-Control-Allow-Origin', `http://localhost:3000`); // update to match the domain you will make the request from
	res.header({
		'Access-Control-Allow-Origin': 'http://localhost:3000',
		'Content-Type': 'application/json',
	});
	next();
});

// app.get('*', (req, res) => {
//   res.status(200).send('Hello World!');
// });

// users route
app.use('/users', usersRouter);
// credit card route
// app.use('/card', cardsRouter);
app.use('/', routes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});