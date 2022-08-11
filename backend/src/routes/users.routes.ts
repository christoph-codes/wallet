import express from 'express';
import { createUser, getUsers, getUser, deleteUser } from '../../redis/functions/users.js';
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
	await getUsers()
		.then(response => {
			console.log('resp', response);
			res.status(200).send(response);
		}).catch((err) => {
			console.log('get users err:', err);
			res.status(401).send({ error: err });
		});
});
router.get('/:userId', async (req, res) => {
	const { userId } = req.params;
	await getUser(userId)
		.then(response => {
			console.log('get User Response:', response);
			res.status(200).send(response);
		}).catch((err) => {
			console.log('get user err:', err);
			res.status(401).send({ error: err });
		});
});
router.post('/remove', async (req, res) => {
	const { userId } = req.body;
	await deleteUser(userId)
		.then(response => {
			console.log('delete User Response:', response);
			res.status(200).send({ success: true});
		}).catch((err) => {
			console.log('delete user err:', err);
			res.status(401).send({ error: err });
		});
});

export default router;