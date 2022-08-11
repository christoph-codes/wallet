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
export default { createUser, getUsers };