import express from 'express';
import { createUser, getUsers } from '../../redis/functions/users.js';
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

router.get('/', async (req, res) => {
	try {
		const users = await getUsers();
		console.log('createdUser: ', users);
		res.status(200).send(users);
	} catch (err) {
		res.status(401).send({ error: err });
	}
});

export default router;