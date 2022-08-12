import { ICard } from './../schema/types/creditCard';
import { creditCardRepository, userRepository } from "../repositories/index.js";
import { IUser } from "../schema/types/user.js";

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

export const updateCard = async (userId: string, updatedUser: IUser) => {
	const user = await creditCardRepository.fetch(userId);
	Object.entries(updatedUser).forEach(item => {
		user[item[0]] = item[1];
	})
	console.log('user', user);
	const id = await creditCardRepository.save(user);
	console.log('created:', id);
	return id;
};

export const getUsersCards = async () => {
	const users = await creditCardRepository.search().return.all();
	console.log('fn gettingUsers: ', users);
	return users;
}

export const getCard = async (userId: string) => {
	const user = await creditCardRepository.fetch(userId);
	console.log('fn gettingUsers: ', user);
	return user;
}

export const deleteCard = async (userId: string) => {
	const deletedUser = await creditCardRepository.remove(userId);
	console.log('fn gettingUsers: ', deletedUser);
	return deletedUser;
}