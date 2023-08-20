import {isNumber, stripChars} from "./misc";

import {
    formatIncompletePhoneNumber,
    getCountryCallingCode,
    isSupportedCountry,
    isValidPhoneNumber,
    Metadata,
    parsePhoneNumber,
} from "libphonenumber-js";

function reformatInternationalNumber(num, code = 'US', callingCode = '1') {
    let num_raw = num
if (isNumber(num_raw)) num_raw = num_raw.toString();
num_raw = stripChars(num_raw).replaceAll(' ', '');
    if (!num_raw) return '';
    return callingCode + num_raw;
}

export function formatPhoneNumber(num, code = 'US') {
    if (!isSupportedCountry(code)) return stripChars(num);
    const calling_code = getCountryCallingCode(code);
    const reformatted = reformatInternationalNumber(num, code, calling_code);

    const formatted = formatIncompletePhoneNumber(reformatted, code);
    let phoneNumber = formatted.substring(formatted.indexOf(getCountryCallingCode(code)) + calling_code.length).trim();

    //Below if fix for bug in libphonenumber-js
    if (phoneNumber.right(1) === ')') phoneNumber = phoneNumber.left(phoneNumber.length - 1);

    return phoneNumber;
}

export function validatePhoneNumber(num, code = 'US') {
    if (!isSupportedCountry(code)) return false;
    const reformatted = reformatInternationalNumber(num, code, getCountryCallingCode(code));
    return isValidPhoneNumber(reformatted, code);
}

export function getMaxNumberLength(code = 'US') {
    const metadata = new Metadata();
    metadata.selectNumberingPlan(code);
    let lengths = metadata.possibleLengths().toString();

    if (isRange(lengths)) {
        lengths = lengths.replace('[', '');
        const lengths_array = lengths.split(',');
        return lengths_array[1];
    }

    if (isArray(lengths)) {
        const lengths_array = lengths.split(',');
        return lengths_array[lengths_array.length - 1];
    }

    if (isSingle(lengths)) {
        return lengths;
    }

    return 99;

    function isRange(value) {
        return value.indexOf(']') !== -1;
    }

    function isArray(value) {
        return value.indexOf(',') !== -1;
    }

    function isSingle(value) {
        return !isRange(value) && !isArray(value) && value !== '';
    }

}

export default function isValidPhoneNumberForCountry(phoneNumberString, country) {
    const phoneNumber = parsePhoneNumber(phoneNumberString, {
        defaultCountry: country,
        // Demand that the entire input string must be a phone number.
        // Otherwise, it would "extract" a phone number from an input string.
        extract: false
    })
    if (!phoneNumber) {
        return false
    }
    if (phoneNumber.country !== country) {
        return false
    }
    return phoneNumber.isValid()
}
