import Week from './week';

export default class User {
    public login: string;
    public weeks: Week[];

    constructor(login: string) {
        this.login = login;
        this.weeks = [];
    }
}
