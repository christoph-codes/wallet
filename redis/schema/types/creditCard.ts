import { Entity, SchemaDefinition } from "redis-om";

export interface ICard extends Entity {
	name?: string;
	issuer?: 'visa' | 'mastercard' | 'discover' | 'amex';
	limit?: number;
	balance?: number;
	dueDate?: Date;
	expirationDate?: string;
	lastFour?: string;
	cvv?: string;
	bgColor?: string;
}

export const creditCardType: SchemaDefinition = {
	name: { type: 'string' },
	issuer: { type: 'string' },
	limit: { type: 'number' },
	balance: { type: 'number' },
	dueDate: { type: 'date'},
	expirationDate: { type: 'string' },
	lastFour: { type: 'string' },
	cvv: { type: 'string' },
	bgColor: { type: 'string'},
};
