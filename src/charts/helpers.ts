import moment from 'moment';
import { Week } from '@/charts';

const fixedStartDate = (start: Date, weekDay: number) => {
    const n = moment(start).day(5);
    if (n.toDate() > start) {
        n.subtract(1, 'weeks');
    }
    return n.toDate();
};

const weeklyList = (start: Date, end: Date) => {
    const weeks = [];
    let next = moment(start).add(1, 'weeks').toDate();
    while (next <= end) {
        weeks.push(new Week(start, next));
        start = next;
        next = moment(start).add(1, 'weeks').toDate();
    }
    return weeks;
};

export { fixedStartDate, weeklyList };
