import { SchemaDefinition } from "redis-om";

export const creditCardType: SchemaDefinition = {
	name: { type: 'string' },
	issuer: { type: 'string' },
	limit: { type: 'number' },
	balance: { type: 'number' },
	expirationDate: { type: 'string' },
	lastFour: { type: 'string' },
};
