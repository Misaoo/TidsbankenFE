import { isSameDay } from 'date-fns';

const isIneligible = (date: Date, ineligibleDates: Date[]): boolean => {
    let output = false;
    ineligibleDates.map(inelDate => {
        if (isSameDay(date, inelDate)) {
            output = true;
        };
    })
    return output;
}

export default {
    isIneligible
}