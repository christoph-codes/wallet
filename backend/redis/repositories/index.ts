import client from "../index.js";
import { creditCardSchema, userSchema } from "../schema/index.js";

export const userRepository = client.fetchRepository(userSchema);
await userRepository.createIndex();
export const creditCardRepository = client.fetchRepository(creditCardSchema);
// TODO: Create credit card index