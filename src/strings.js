
// noinspection JSUnusedGlobalSymbols

export function isString(x) {
    return x?.constructor === String;
}

export function trimString(x) {
    if (typeof x === 'string' || x instanceof String) x = x.trim();
    return x;
}

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
    return this.slice( -(n) );
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

export default String;