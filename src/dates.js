import {isNull} from "./misc";

export function getDateWithoutTime(date) {
    const utc_string = date.toISOString();
    const date_string = utc_string.split('T')[0];
    return new Date(date_string);
}

export function compare(date1, date2) {
    if (isNull(date1) || isNull(date2)) return 0;
    if(typeof date1 === 'string') date1 = new Date(date1);
    if(typeof date2 === 'string') date2 = new Date(date2);

    const date1_date = getDateWithoutTime(date1);
    const date2_date = getDateWithoutTime(date2);

    if (date1_date > date2_date) return 1;
    if (date1_date === date2_date) return 0;
    if (date1_date < date2_date) return -1;

    return 0;

}
