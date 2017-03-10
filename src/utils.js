/**
 * Returns date in format dd.mm.yyyy
 * @param dateUTC - date in UTC format
 */
export function getFormattedDate(dateUTC) {
    const date = new Date(dateUTC);
    const dateDay = pad(date.getDate());
    const dateMonth = pad(date.getMonth() + 1);
    const dateYear = date.getFullYear();

    return `${dateDay}.${dateMonth}.${dateYear}`
}

export function pad(number, width = 2, z = '0') {
    number = number.toString();
    const numberLength = number.length;

    return numberLength >= width ?
        number :
        new Array(width - numberLength + 1).join(z) + number;
}
