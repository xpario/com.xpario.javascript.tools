// noinspection JSUnusedGlobalSymbols

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

export default Number;