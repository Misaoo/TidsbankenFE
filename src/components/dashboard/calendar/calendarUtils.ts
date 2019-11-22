import { isSameDay, isWithinInterval, addDays, eachDayOfInterval, isAfter } from 'date-fns';

interface Interval {
    start: Date,
    end: Date
}

export const isIneligible = (date: Date, ineligibleDates: []): boolean => {
    let output = false;
    ineligibleDates.map((inelDate: any) => {
        if (isSameDay(date, new Date(inelDate.date))) {
            output = true;
        };
    })
    return output;
}

export const isDateBetween = (interval:Interval, date: Date): boolean => {
    if (interval.start === undefined || interval.end === undefined) {
        return false;
    }
    return isWithinInterval(date, { start: interval.start, end: interval.end });
}

export const daysBetween = (interval: Interval): number => {
    return eachDayOfInterval({ start: interval.start, end: interval.end }).length;
}

export const datesInInterval = (interval: Interval, dates: Date[]): boolean => {
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

export const isIntervalNormalized = (interval: Interval): boolean => {
    let result = true;
    if (!isAfter(interval.end, interval.start)) {
        result = false;
    }
    return result;
}

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