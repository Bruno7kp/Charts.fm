import { Year } from '@/charts';

export default class YearlyCharts {
    public startDate: Date;
    public startDay: number = 5;
    public limit: number = 20;
    public years: Year[];

    public constructor(startDate: Date, years: Year[]) {
        this.startDate = startDate;
        this.years = years;
    }
}
