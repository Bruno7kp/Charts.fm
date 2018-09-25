import moment from 'moment';

const fixedStartDate = (start: Date, weekDay: number) => {
    const n = moment(start).day(5);
    if (n.toDate() > start) {
        n.subtract(1, 'weeks');
    }
    return n.toDate();
};

export { fixedStartDate };
