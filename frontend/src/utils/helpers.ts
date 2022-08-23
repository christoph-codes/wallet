export const setWithExpiry = (key: string, value: any, ttl: number) => {
	const now = new Date();

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value,
		expiry: now.getTime() + ttl,
	};
	if (!ttl) {
		localStorage.setItem(key, JSON.stringify(value));
	} else {
		localStorage.setItem(key, JSON.stringify(item));
	}
};
export const getWithExpiry = (key: string) => {
	const itemStr = localStorage.getItem(key);
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	if (item.expiry) {
		// compare the expiry time of the item with the current time
		if (now.getTime() > item.expiry) {
			// If the item is expired, delete the item from storage
			// and return null
			localStorage.removeItem(key);
			return null;
		}
	}
	return item.value;
};
export const clearItem = (key: string) => {
	localStorage.removeItem(key);
};

export const invertColor = (hex: string) => {
	if (hex?.indexOf("#") === 0) {
		hex = hex.slice(1);
	}
	// convert 3-digit hex to 6-digits.
	if (hex?.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (hex?.length !== 6) {
		throw new Error("Invalid HEX color.");
	}
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);
	// Credit: https://stackoverflow.com/a/3943023/112731
	return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
};

export const validateCreditCardNumber = (value: string) => {
	let visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
	let mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
	let amexpRegEx = /^(?:3[47][0-9]{13})$/;
	let discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

	if (visaRegEx.test(value)) {
		return "visa";
	} else if (mastercardRegEx.test(value)) {
		return "mastercard";
	} else if (amexpRegEx.test(value)) {
		return "amex";
	} else if (discovRegEx.test(value)) {
		return "discover";
	}
  }