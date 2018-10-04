import { Month } from '@/charts';

export default class MonthlyCharts {
    public startDate: Date;
    public startDay: number = 5;
    public limit: number = 20;
    public months: Month[];

    public constructor(startDate: Date, months: Month[]) {
        this.startDate = startDate;
        this.months = months;
    }
}
