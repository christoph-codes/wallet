import { userRepository } from "../repositories/index.js";

export interface ICreateUserArgs {
	fname: string;
	lname: string;
	email: string;
}
	
export const createUser = async ({ fname, lname, email }: ICreateUserArgs) => {
	if (!fname && !lname && !email) {
		throw new Error('You must prrovide a first name, last name, and email to create an account.');
	}
	const created = await userRepository.createAndSave({
		fname,
		lname,
		email,
	});
	console.log('created:', created);
	return created;
};

export const getUsers = async () => {
	const users = await userRepository.search().return.all();
	console.log('fn gettingUsers: ', users);
	return users;
}

export const getUser = async (userId: string) => {
	const user = await userRepository.fetch(userId);
	console.log('fn gettingUsers: ', user);
	return user;
}

export const deleteUser = async (userId: string) => {
	const deletedUser = await userRepository.remove(userId);
	console.log('fn gettingUsers: ', deletedUser);
	return deletedUser;
}
export default { createUser, getUsers };