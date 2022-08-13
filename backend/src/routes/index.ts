import express from 'express';
const router = express.Router();

router.get('/healthcheck', (req, res) => {
	try {
		console.log('Everything is healthy');
		res.send({ status: 'Everything is healthy' });
	} catch (err) {
		res.send({ status: 'Everything is NOT healthy' });
	}
});

export default router;