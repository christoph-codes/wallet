import { Entity, SchemaDefinition } from "redis-om";

export interface IUser extends Entity {
	authId?: string;
	fname?: string;
	lname?: string;
	email?: string;
	dob?: Date;
	totalCredit?: number;
	totalBalance?: number;
	cards?: string[];
}

export const userType: SchemaDefinition = {
	authId: { type: 'string'},
	fname: { type: 'string' },
	lname: { type: 'string' },
	email: { type: 'string'},
	dob: { type: 'date' },
	totalCredit: { type: 'number' },
	totalBalance: { type: 'number' },
	cards: { type: 'string[]' },
  };
