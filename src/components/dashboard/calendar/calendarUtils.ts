import { isSameDay, isWithinInterval, eachDayOfInterval, isAfter } from 'date-fns';

interface Interval {
    start: Date,
    end: Date
}

/**
 * Checks if a date is within the ineligibleDates range of dates.
 * @param date: Date
 * @param ineligibleDates : []
 */
export const isIneligible = (date: Date, ineligibleDates: []): boolean => {
    let output = false;
    ineligibleDates.map((inelDate: any) => {
        if (isSameDay(date, new Date(inelDate.date))) {
            return output = true;
        } else {
            return output
        }
    });
    return output;
}

/**
 * Check if date is within interval
 * @param interval: Interval
 * @param date: Date
 */
export const isDateBetween = (interval:Interval, date: Date): boolean => {
    if (interval.start === undefined || interval.end === undefined) {
        return false;
    }
    return isWithinInterval(date, { start: interval.start, end: interval.end });
}

/**
 * Get the number of days in a selected interval
 * @param interval: Interval
 */
export const daysBetween = (interval: Interval): number => {
    return eachDayOfInterval({ start: interval.start, end: interval.end }).length;
}

/**
 * Filter out ineligible days from an interval.
 * @param interval: Interval
 * @param dates: Array
 */
export const validDatesInInterval = (interval: Interval, dates: []): Date[] => {
    let eachDay = eachDayOfInterval(interval);
    let validDates:any = [];

    eachDay.map((date: Date) => {
        if (!isIneligible(date, dates)) {
            return validDates.push(date);
        } else {
            return validDates
        }
    })
    return validDates;
}

/**
 * Check that the provided dates are within the provided interval
 * @param interval: Interval
 * @param dates: Array
 */
export const datesInInterval = (interval: Interval, dates: []): boolean => {
    let output = false;

    if (interval.start === undefined || interval.end === undefined) {
        return false;
    }

    if (dates.length <= 0) {
        return false;
    }

    dates.map((date: any) => {
        if (isWithinInterval(new Date(date.date), interval)) {
            return output = true;
        } else {
            return output
        }
    });

    return output;
}

/**
 * Check that the start date is before the end date
 * @param interval: Interval
 */
export const isIntervalNormalized = (interval: Interval): boolean => {
    let result = true;
    if (!isAfter(interval.end, interval.start)) {
        result = false;
    }
    return result;
}

/**
 * Rearranges the interval if the end Date is before the start date.
 * @param interval: Interval
 */
export const normalizeInterval = (interval: Interval): Interval => {
    let normalizedInterval: Interval = interval;

    if (!isAfter(interval.end, interval.start)) {
        return {start: interval.end, end: interval.start} as Interval;
    }
    return normalizedInterval;
}

export default {
    isIneligible,
    isDateBetween,
    daysBetween,
    datesInInterval
}