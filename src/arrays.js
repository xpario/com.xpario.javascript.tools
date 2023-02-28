// noinspection JSUnusedGlobalSymbols

Array.prototype.isEmpty = function () {
    return (!Array.isArray(this) || !this.length);
}

Array.prototype.toCSV = function () {
    if (Array.isArray(this)) {
        return this.join(",");
    } else {
        return this;
    }
}

Array.prototype.toDecimalString = function () {
    if (Array.isArray(this)) {
        return this.join(".");
    } else {
        return this;
    }
}

Array.prototype.shuffle = function() {
    let shuffled_array = [], n = this.length, i;

    // While there remain elements to shuffle…
    while (n) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * this.length);

        // If not already shuffled, move it to the new array.
        if (i in this) {
            shuffled_array.push(this[i]);
            delete this[i];
            n--;
        }
    }

    return shuffled_array;
}


export default Array;