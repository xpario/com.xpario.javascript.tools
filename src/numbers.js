// noinspection JSUnusedGlobalSymbols

import {defaultLocale} from "@xpario/javascript-tools/src/locales";

const length_factor = 3.281;
const mass_factor = 2.205;

Number.prototype.covertFeetToMeters = function () {
	return (this / length_factor);
}

Number.prototype.covertMetersToFeet = function () {
	return (this * length_factor);
}

Number.prototype.covertLbsToKG = function () {
	return (this / mass_factor);
}

Number.prototype.covertKGToLbs = function () {
	return (this * mass_factor);
}

Number.safeToString = function (value) {
	return (value === undefined || value === null) ? '' : value.toString();
}

function insertNumberSeparator(numberString, numberSeparator = ',') {
	// Reverse the string, match groups of 3 characters, join with commas, then reverse back
	let reversedString = numberString.split('').reverse().join('');

	return numberString.split('').reverse().join('').match(/.{1,3}/g).join(numberSeparator).split('').reverse().join('');
}

Number.prototype.toLocaleString2 = function (objLocale = defaultLocale) {
	// Split the number string into the integer and decimal parts

	const digitGroupingSeparator = objLocale.digitGroupingSeparator;
	const decimalSeparator = objLocale.decimalSeparator;

	const numberString = this.toString();
	const [integerPart, decimalPart] = numberString.split('.');
	const formattedIntegerPart = insertNumberSeparator(integerPart, digitGroupingSeparator);

	return decimalPart ? formattedIntegerPart + decimalSeparator + decimalPart : formattedIntegerPart;
}

export default Number;
