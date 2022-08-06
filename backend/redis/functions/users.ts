import { userRepository } from "../repositories/index.js";

export interface ICreateUserArgs {
	fname: string;
	lname: string;
	email: string;
}

export const testFunc = () => {
	console.log('Hello');
}
	
export const createUser = async ({ fname, lname, email }: ICreateUserArgs) => {
	console.log('Grabbing User', { fname, lname, email });
	if (!fname && !lname && !email) {
		throw new Error('You must prrovide a first name, last name, and email to create an account.');
	}
	console.log('userRepo',userRepository);
	const created = await userRepository.createEntity({
		fname,
		lname,
		email,
	});
	console.log('created:', created);
	return created;
};

export default createUser;