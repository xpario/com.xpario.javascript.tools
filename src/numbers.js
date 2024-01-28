// noinspection JSUnusedGlobalSymbols

//import {getCurrentLanguageTag} from "./locales";

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

Number.prototype.toFormattedString = function (maxDecimals = 2, minDecimals = 0, languageTag = 'en-US') {

    return Intl.NumberFormat(languageTag, {
            maximumFractionDigits: maxDecimals,
            minimumFractionDigits: minDecimals
        }
    ).format(this);
}

export default Number;
