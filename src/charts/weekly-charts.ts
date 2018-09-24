import { Week } from '@/charts';

export default class WeeklyCharts {
    public startDate: Date;
    public startDay: number = 5;
    public limit: number = 20;
    public weeks: Week[];

    public constructor(startDate: Date, weeks: Week[]) {
        this.startDate = startDate;
        this.weeks = weeks;
    }
}
