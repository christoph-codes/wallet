import { userRepository } from "../repositories/index.js";
import { IUser } from "../schema/types/user.js";

export interface ICreateUserArgs {
	fname: string;
	lname: string;
	email: string;
	uid?: string;
}
	
export const createUser = async ({ fname, lname, email, uid }: ICreateUserArgs) => {
	if (!fname && !lname && !email) {
		throw new Error('You must prrovide a first name, last name, and email to create an account.');
	}
	const created = await userRepository.createAndSave({
		authId: uid,
		fname,
		lname,
		email,
		cards: []
	});
	return created;
};

export const updateUser = async (userId: string, updatedUser: IUser) => {
	const user = await userRepository.fetch(userId);
	Object.entries(updatedUser).forEach(item => {
		user[item[0]] = item[1];
	})
	const id = await userRepository.save(user);
	return id;
};

export const getUsers = async () => {
	const users = await userRepository.search().return.all();
	return users;
}

export const getUser = async (authId: string) => {
	const user = await userRepository.search().where('authId').equals(authId).return.all();
	return user;
}

export const deleteUser = async (userId: string) => {
	const deletedUser = await userRepository.remove(userId);
	return deletedUser;
}
export default { createUser, getUsers };