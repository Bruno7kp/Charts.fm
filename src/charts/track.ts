export default class Track {
    public rank: number;
    public name: string;
    public artist: string;
    public playcount: number;

    constructor(name: string, artist: string, rank: number, playcount: number) {
        this.name = name;
        this.artist = artist;
        this.rank = rank;
        this.playcount = playcount;
    }
}
