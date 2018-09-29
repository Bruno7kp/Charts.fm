export default class Artist {
    public rank: number;
    public name: string;
    public playcount: number;

    constructor(name: string, rank: number, playcount: number) {
        this.name = name;
        this.rank = rank;
        this.playcount = playcount;
    }
}
