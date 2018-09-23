import Week from './week';

export default class User {
    public login: string;
    public registerDate: Date;
    public startDate: Date;
    public weeks: Week[];

    constructor(login: string, registerDate: Date) {
        this.login = login;
        this.weeks = [];
        this.registerDate = registerDate;
        this.startDate = registerDate;
    }
}
