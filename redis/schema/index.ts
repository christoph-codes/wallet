import { Entity, Schema } from 'redis-om';
import { creditCardType } from './types/creditCard.js';
import { userType } from './types/user.js';

class User extends Entity {
	cards: string[];
};
class CreditCard extends Entity { };

const creditCardSchema = new Schema(CreditCard, creditCardType);
const userSchema = new Schema(User, userType);

export { creditCardSchema, userSchema };