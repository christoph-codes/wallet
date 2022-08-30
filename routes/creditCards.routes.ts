import express from 'express';
import { addCard, getUsersCards, getCard, deleteCard, updateCard } from '../redis/functions/cards.js';
const router = express.Router();

router.post('/add', async (req, res) => {
	const { card, userId } = req.body;
	if (!userId) {
		res.status(403).send({
			message: 'You are not authorized to create an account with this user information.',
		})
	}
	if (!card) {
		res.status(401).send({
			message: 'You must enter valid card data to add a new card.'
		})
	}
	try {
		const addedCard = await addCard(card, userId);
		res.send({ successful: addedCard});
	} catch (err) {
		res.send({ error: err.toString() });
	}
});

router.post('/', async (req, res) => {
	const { userId } = req.body;
	await getUsersCards(userId)
		.then(response => {
			res.status(200).send(response);
		}).catch((err) => {
			if (err) {
				res.status(401).send({ error: err.toString() });
			}
			console.log(err);
			res.status(400).send({ error: 'Not sure why it failed'})
		});
});
router.get('/get', async (req, res) => {
	const { cardId, userId } = req.body;
	await getCard(cardId, userId)
		.then(response => {
			res.status(200).send(response);
		}).catch((err) => {
			console.log('err', err);
			res.status(400).send({ error: err.toString() });
		});
});
router.post('/remove', async (req, res) => {
	const { cardId, userId } = req.body;
	await deleteCard(cardId, userId)
		.then(response => {
			console.log('response', response);
			res.status(200).send({ success: true });
		}).catch((err) => {
			res.status(401).send({ error:err.toString() });
		});
});
router.post('/update', async (req, res) => {
	const { cardId, updatedCard } = req.body;
	if (!cardId || !updatedCard) {
		res.status(401).send({ error: 'You must provide a valid id and updated Card object to update this Card.'})
	};
	await updateCard(cardId, updatedCard)
		.then(response => {
			console.log('update Card Response:', response);
			res.status(200).send({ updatedCardId: response});
		}).catch((err) => {
			console.log('update Card err:', err);
			res.status(401).send({error: err.toString() });
		});
});
export default router;