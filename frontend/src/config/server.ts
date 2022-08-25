import axios from "axios";

const baseURL = process.env.SERVER_URL || "http://localhost:5000/";
const clientURL = process.env.CLIENT_URL || "http://localhost:3000/";

export const db = axios.create({
	baseURL,
	timeout: 1000,
	headers: {
		"Access-Control-Allow-Origin": clientURL,
		"Access-Control-Allow-Headers": "*",
		"Content-Type": "application/json",
	},
});
