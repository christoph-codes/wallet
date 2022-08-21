import { ICard } from './../schema/types/creditCard';
import { creditCardRepository, userRepository } from "../repositories/index.js";
import client from '../index.js';

/**
 * Add card to redis function
 * @param card The keys based on the CreditCard schema in an object
 * @param userId Custom user id saved by the client
 * @returns The created credit card and adds the generated card it do the loggedin user.
 */
export const addCard = async (card: ICard, userId: string) => {
	console.log('adding card');
	if (!userId) {
		throw new Error('A valid user must be logged in.');
	}
	if (!card.name && !card.issuer && !card.limit && !card.dueDate && !card.lastFour && !card.expirationDate && !card.balance) {
		throw new Error('You must prrovide valid credit card data to add this card to your account.');
	}
	const created = await creditCardRepository.createAndSave({
		name: card.name,
		issuer: card.issuer,
		limit: card.limit,
		dueDate: card.dueDate,
		lastFour: card.lastFour,
		expirationDate: card.expirationDate,
		balance: card.balance,
	}).then(async res => {
		console.log(res.entityId);
		const user = await userRepository.fetch(userId);
		user.cards = [...user.cards,res.entityId];
		await userRepository.save(user);
		return {
			userUpdated: user.entityId,
			cardAdded: res.entityId,
		}
	}).catch(err => {
		return err;
	});
	return created;
};

/**
 * Update card to redis function
 * @param updatedCard The keys based on the CreditCard schema in an object to be updated
 * @param cardId Custom card id sent by the client
 * @returns The updated credit card.
 */
export const updateCard = async (cardId: string, updatedCard: ICard) => {
	const card = await creditCardRepository.fetch(cardId);
	Object.entries(updatedCard).forEach(item => {
		card[item[0]] = item[1];
	})
	const id = await creditCardRepository.save(card);
	return id;
};

/**
 * Get a users card from the redis database
 * @param userId Custom user id saved by the client
 * @returns an array of credit cards associated to the users account.
 */
export const getUsersCards = async (userId: string) => {
	const user = await userRepository.fetch(userId); 
	
	if ((user?.cards?.length || 0) < 1) {
		return [];
	}
	const cards = user.cards?.map(async cardId => {
		return await creditCardRepository.fetch(cardId);
	});
	return await Promise.all(cards);
}

/**
 * Get a single card from the redis database
 * @param userId Custom user id saved by the client
 * @param cardId Custom card id sent by the client
 * @returns a single credit card associated to a users account.
 */
export const getCard = async (cardId: string, userId: string) => {
	const user = await userRepository.fetch(userId);
	const exists = await client.execute(['EXISTS', `User:${userId}`]);
	if (!exists) {
		throw new Error('This user does not exist');
	}
	if (!user?.cards?.includes(cardId)) {
		throw new Error('This user does not have access to this card');
	}
	const card = await creditCardRepository.fetch(cardId);
	return card;
}

/**
 * Delete a single card from the redis database
 * @param userId Custom user id saved by the client
 * @returns a success object once deleted.
 */
export const deleteCard = async (cardId: string, userId: string) => {
	const user = await userRepository.fetch(userId);
	const exists = await client.execute(['EXISTS', `User:${userId}`]);
	if (!exists) {
		throw new Error('This user does not exist');
	}
	if (!user.cards.includes(cardId)) {
		throw new Error('This user does not have access to this card');
	}
	const deletedCard = await creditCardRepository.remove(cardId);

	return deletedCard;
}