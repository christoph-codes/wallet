import express from 'express';
import { createUser, testFunc } from '../../redis/functions/users.js';
const router = express.Router();

router.post('/create', async (req, res) => {
	const { user } = req.body;
	console.log('body:', req.body);
	if (!user) {
		res.status(401).send({
			message: 'You must enter valid user info to create a user.'
		})
	}
	try {
		console.log('User object: ', user);
		// testFunc();
		const createdUser = await createUser(user);
		console.log('createdUser: ', createdUser);
		res.send(createdUser);
	} catch (err) {
		res.send({ status: 'Users are NOT healthy' });
	}
});

router.get('/', (req, res) => {
	try {
		console.log(req.body);
		res.send({ status: 'Users are healthy' });
	} catch (err) {
		res.send({ status: 'Users are NOT healthy' });
	}
});

export default router;