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

String.prototype.toFloat = function (objLocale = defaultLocale) {

    const allWhitespace = new RegExp("[\\s\\u00A0]", 'g');
    let result = this.replace(allWhitespace, '');

    const digitGroupingSeparator = new RegExp(objLocale.digitGroupingSeparator, 'g');
    result = result.replace(digitGroupingSeparator, '');

    result = result.replace(objLocale.currencyCode, '');
    result = result.replace(objLocale.currencySymbol, '');
    result = result.replace(objLocale.decimalSeparator, '.');

    result = parseFloat(result);

    if (isNaN(result)) return null;
    return result;
}

export default String;
