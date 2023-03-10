// noinspection JSUnusedGlobalSymbols

import {isString} from "./strings";
import {AsYouType, isValidPhoneNumber} from "libphonenumber-js";

export function hello_world() {
    alert('hello world!');
}

export function typeOf(obj) {
    return Object.prototype.toString.call(obj).replace(/^\[object (.+)]$/, "$1").toLowerCase()
}

export function isValid_Email(email) {
    return (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(email));
}

export const isRegEx = (value) => {
    return value instanceof RegExp;
}

export function isValidRegExString(value) {
    try {
        new RegExp(value);
    } catch (e) {
        return false;
    }
    return true;
}

export function isJSON(item) {
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

export function isEmpty(val) {
    let result = true;
    if (isString(val) || Array.isArray(val)) result = val.isEmpty();
    return result;
}

export function isObject(obj) {
    return ((typeof obj === 'object') && (obj !== null) && (!Array.isArray(obj)));
}

export function isFunction(func) {
    return (typeof func === 'function');
}

export function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

export function isBoolean(value) {
    return typeof value === 'boolean';
}

export function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

export function formatPhoneNumber(num, code = 'US') {
    let result ='';
    if (isNumber(num)) num = num.toString();

    if (num) {
        result = new AsYouType(code).input(stripChars(num));
        //Below if fix for bug in libphonenumber-js
        if (result.right(1) === ')') result = result.left(result.length - 1);
    }

    return result;
}

export function isValidSQLId(id) {
    let valid = false;
    if (isString(id)) {
        valid = !isEmpty(id);
    }
    if (isNumber(id)) {
        valid = id > -1;
    }
    return valid;
}

export function validatePhoneNumber(num, code = 'US') {
    if (isNumber(num)) num = num.toString();
    let result = false;

    if (num) {
        result = isValidPhoneNumber(num, code);
    }

    return result;
}

export function stripChars(str) {
    return str.replace(/\D/g, '');
}

export function isDefined(variable) {
    return (typeof variable !== typeof undefined);
}

export function markRequired(label) {
    return label + '*';
}

export async function wait(ms = 5000) {
    await new Promise(resolve => setTimeout(resolve, ms));
}