import express from 'express';
import { addCard, getUsersCards, getCard, deleteCard, updateCard } from '../../redis/functions/cards.js';
const router = express.Router();

router.post('/add', async (req, res) => {
	const { card, userId } = req.body;
	if (!card) {
		res.status(401).send({
			message: 'You must enter valid card data to add a new card.'
		})
	}
	try {
		const addedCard = await addCard(card,userId);
		res.send({ successful: addedCard});
	} catch (err) {
		res.send({ status: 'Cards are NOT healthy' });
	}
});

router.get('/', async (req, res) => {
	await getUsersCards()
		.then(response => {
			console.log('resp', response);
			res.status(200).send(response);
		}).catch((err) => {
			console.log('get cards err:', err);
			res.status(401).send({ error: err });
		});
});
router.get('/:cardId', async (req, res) => {
	const { cardId } = req.params;
	await getCard(cardId)
		.then(response => {
			console.log('get Card Response:', response);
			res.status(200).send(response);
		}).catch((err) => {
			console.log('get Card err:', err);
			res.status(401).send({ error: err });
		});
});
router.post('/remove', async (req, res) => {
	const { cardId } = req.body;
	await deleteCard(cardId)
		.then(response => {
			console.log('delete Card Response:', response);
			res.status(200).send({ success: true});
		}).catch((err) => {
			console.log('delete card err:', err);
			res.status(401).send({ error: err });
		});
});
router.post('/update', async (req, res) => {
	console.log('fire');
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
			res.status(401).send({ error: err });
		});
});
export default router;