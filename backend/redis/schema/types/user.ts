import { SchemaDefinition } from "redis-om";

export interface User {
	fname: string;
	lname: string;
	email: string;
	dob?: Date;
	totalCredit?: number;
	totalBalance?: number;
}

export const userType: SchemaDefinition = {
	fname: { type: 'string' },
	lname: { type: 'string' },
	email: { type: 'string'},
	dob: { type: 'date' },
	totalCredit: { type: 'number' },
	totalBalance: { type: 'number'},
  };
