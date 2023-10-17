export const compareDates = function (objects1, objects2, index_field = 'id', date_field = 'modified_date') {

    const object1_array = objects1;
    if (!Array.isArray(object1_array)) return [object1_array];

    const object2_array = objects2;
    let object2;
    if (!Array.isArray(object2_array)) return [object2_array];

    for (const object1 of object1_array) {
        if (!object1.hasOwnProperty(index_field)) return false;

        const object2Index = object2_array.findIndex(obj => {
            return String(obj[index_field]) === String(object1[index_field])}
        );

        if (object2Index === -1) return false;
        object2 = object2_array[object2Index];

        if (!_objectCompareDate(object1, object2, date_field)) return false;
        object2_array.splice(object2Index, 1);
    }

    return object2_array.length <= 0;

}

export const _objectCompareDate = function (object1, object2, date_field = 'modified_date') {
    if (!_isObject(object1)) return false;
    if (!_isObject(object2)) return false;

    const date1 = new Date(object1[date_field]);
    const date2 = new Date(object2[date_field]);

    return date1.toString() === date2.toString();
}


function _isObject(object) {
    return object != null && typeof object === 'object';
}
