import { isSameDay, isWithinInterval, addDays, eachDayOfInterval } from 'date-fns';

export const isIneligible = (date: Date, ineligibleDates: Date[]): boolean => {
    let output = false;
    ineligibleDates.map(inelDate => {
        if (isSameDay(date, inelDate)) {
            output = true;
        };
    })
    return output;
}

export const isDateBetween = (start: Date, end: Date, date: Date): boolean => {
    if (start === undefined || end === undefined) {
        return false;
    }
    return isWithinInterval(date, { start: start, end: end });
}

export const daysBetween = (start: Date, end: Date): number => {
    return eachDayOfInterval({ start: start, end: end }).length;
}

export const datesInInterval = (interval: { start: Date, end: Date }, dates: Date[]): boolean => {
    let output = false;

    if (interval.start === undefined || interval.end === undefined) {
        return false;
    }

    if (dates.length <= 0) {
        return false;
    }

    dates.map(date => {
        if (isWithinInterval(date, interval)) {
            output = true;
        }
    });

    return output;
}

export default {
    isIneligible,
    isDateBetween,
    daysBetween,
    datesInInterval
}