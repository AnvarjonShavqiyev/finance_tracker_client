import { FIRST_ELEMENT, ZERO } from "../constants";

export const transformDate = (date: string) => {
    const dateAndHour = date.split('T');

    return `${dateAndHour[ZERO]} ${dateAndHour[FIRST_ELEMENT].split('.')[ZERO]}`
}
