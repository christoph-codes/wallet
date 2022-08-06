import client from "../index.js";
import { creditCardSchema, userSchema } from "../schema/index.js";

export const userRepository = client.fetchRepository(userSchema);
export const creditCardRepository = client.fetchRepository(creditCardSchema);