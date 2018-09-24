import { WeeklyCharts } from '@/charts';

export default class User {
    public login: string;
    public registerDate: Date;
    public weeklyCharts: WeeklyCharts;

    constructor(login: string, registerDate: Date) {
        this.login = login;
        this.registerDate = registerDate;
        this.weeklyCharts = new WeeklyCharts(registerDate, []);
    }
}
