import { WeeklyCharts, MonthlyCharts, YearlyCharts } from '@/charts';

export default class User {
    public login: string;
    public registerDate: Date;
    public weeklyCharts: WeeklyCharts;
    public monthlyCharts: MonthlyCharts;
    public yearlyCharts: YearlyCharts;

    constructor(login: string, registerDate: Date) {
        this.login = login;
        this.registerDate = registerDate;
        this.weeklyCharts = new WeeklyCharts(registerDate, []);
        this.monthlyCharts = new MonthlyCharts(registerDate, []);
        this.yearlyCharts = new YearlyCharts(registerDate, []);
    }
}
