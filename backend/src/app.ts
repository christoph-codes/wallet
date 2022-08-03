import express from 'express';
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});