// noinspection JSUnusedGlobalSymbols

import {defaultLocale} from "./locales";

String.prototype.jsonMinify = function () {
	let result = this;
	if (this.isJSON()) {
		result = JSON.stringify(JSON.parse(this));
	}
	return result;
}

String.prototype.truncate = function (length) {
	let result = this;
	let maxLength = length - 3;

	if (this.length > maxLength) {
		result = this.substring(0, maxLength) + '...';
	}

	return result;
}

String.prototype.left = function (n) {
	return this.substring(0, n);
}

String.prototype.right = function (n) {
	return this.slice(-(n));
}

String.prototype.brackets = function () {
	return '[' + this + ']';
}

String.prototype.format = function (values) {
	let str = this;
	if (!Array.isArray(values)) values = new Array(values);
	if (Array.isArray(values)) {
		for (let i = 0; i < values.length; i++) {
			str = str.replace("{" + i + "}", values[i])
		}
	}

	return str;
}

String.prototype.isBlank = function () {
	return (!this || /^\s*$/.test(this));
}

String.prototype.isEmpty = function () {
	return (!this || this.length === 0);
}

String.prototype.isJSON = function () {
	let item = this;
	item = typeof item !== "string"
		? JSON.stringify(item)
		: item;

	try {
		item = JSON.parse(item);
	} catch (e) {
		return false;
	}

	return typeof item === "object" && item !== null;
}

String.prototype.toHex = function () {
	let result = '';
	for (let x of this) {
		result += Number(x.charCodeAt(0)).toString(16);
	}
	return result;
}

String.prototype.fromHex = function () {
	let result = '';
	for (let i = 0; i < this.length; i += 2) {
		result += String.fromCharCode(parseInt(this.substring(i, i + 2), 16));
	}
	return result;
}

String.prototype.escapeSingleQuotes = function () {
	let result = this;
	result = this.replace(/’/g, "\\\\'");
	return result;
}

function splitDecimalString(decimalString, decimalSeparator) {

	const result = {numberPart: null, decimalPart: null};
	// Split the decimal string into the number and decimal parts
	const parts = decimalString.split(decimalSeparator);

	if (parts.length === 0) {
		// If there are no parts, return null object
		return result;
	}

	result.numberPart = parts[0].replace(/\D/g, '');

	if (parts.length > 1) {
		result.decimalPart = parts[1].replace(/\D/g, '');
	} else {
		result.decimalPart = 0;
	}

	return result;
}

String.prototype.toLocaleFloat = function (objLocale = defaultLocale) {
	if (this.isBlank()) return null;

	const decimalSeparator = objLocale.decimalSeparator;
	const regexWhitespace = new RegExp("[\\s\\u00A0]", 'g');
	const trimmedValue = this.replace(regexWhitespace, '');
	const objDecimal = splitDecimalString(trimmedValue, decimalSeparator);
	const strValue = objDecimal.numberPart.replace(/\D/g, '') + '.' + objDecimal.decimalPart;
	const result = parseFloat(strValue);

	if (isNaN(result)) return null;
	return result;
}

export default String;
