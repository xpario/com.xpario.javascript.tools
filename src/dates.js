import {isNull} from "./misc";

export function getCurrentLocalDateTime() {
    let diff = new Date() - (new Date().getTimezoneOffset() * 60 * 1000);
    return new Date(diff);
}

function getTimeZoneOffsetString() {
    const dt = new Date();
    const tz = dt.getTimezoneOffset();
    const tz_hour = Math.floor(tz / 60);
    if (tz_hour <= 0) return '+' + tz_hour.toString();
    if (tz_hour > 0) return '-' + tz_hour.toString();
}

function getEqualizedISODate(date) {
    const utc_string = date.toISOString();
    const date_string = utc_string.split('T')[0];
    const iso_string = date_string + 'T00:00:00' + getTimeZoneOffsetString() + ':00';
    return new Date(iso_string);
}

export function compare(date1, date2) {
    if (isNull(date1) || isNull(date2)) return 0;

    const date1a = getEqualizedISODate(date1);
    const date2a = getEqualizedISODate(date2);

    if (date1a > date2a) return 1;
    if (date1a === date2a) return 0;
    if (date1a < date2a) return -1;

    return 0;

}