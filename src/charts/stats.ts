import { Artist, Album, Track } from '@/charts';

interface Chart {
    start: Date;
    end: Date;
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
    limit: number;
}

interface Entry {
    chart: {
        start: any,
        end: any,
        index: number,
    };
    rank: number|null;
    playcount: number|null;
}

class Stats {
    public type: string;
    public name: string;
    public artist: string|null;
    private run: Entry[];
    private entries: number[];
    private index: number;

    constructor(type: string, name: string, artist: string|null = null) {
        this.type = type;
        this.name = name;
        this.artist = artist;
        this.run = [];
        this.entries = [];
        this.index = 0;
    }

    public add(index: number, chart: Chart, entry: any) {
        this.run[index] = {
            chart: {
                start: chart.start,
                end: chart.end,
                index,
            },
            rank: (typeof entry !== 'undefined') ? entry.rank : null,
            playcount: (typeof entry !== 'undefined') ? entry.playcount : null,
        };
        this.index = index;
        if (typeof entry !== 'undefined') {
            this.entries.push(index);
        }
    }

    public until(index: number): this {
        this.index = index;
        return this;
    }

    public getEntries() {
        return this.entries.filter((value: any) => value <= this.index);
    }

    public getDebut() {
        return this.run[this.entries[0]];
    }

    public getCurrent() {
        return this.run[this.index];
    }

    public getPrevious() {
        if (this.index > 0) {
            return this.run[this.index - 1];
        }
        return {rank: null, playcount: null};
    }

    public extract() {
        const e = this.getEntries();
        const run: Entry[][] = [];
        const x = {
            peak: 0,
            peak_times: 0,
            peak_playcount: 0,
            rank_sum: 0,
            playcount_sum: 0,
            points: 0,
            run,
        };
        let seq: Entry[] = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < e.length; i++) {
            const index = e[i];
            const cr = this.run[index].rank as number;
            const cp = this.run[index].playcount as number;
            if (i > 0 && (index - e[i - 1]) > 1) {
                x.run.push(seq);
                seq = [ this.run[index] ];
            } else {
                seq.push(this.run[index]);
            }
            x.rank_sum += cr;
            x.playcount_sum += cp;
            x.points += (101 - cr);
            if (i === 0) {
                x.peak = cr;
                x.peak_times = 1;
                x.peak_playcount = cp;
            } else {
                if (cr < x.peak) {
                    x.peak = cr;
                    x.peak_times = 1;
                } else if (cr === x.peak) {
                    x.peak_times++;
                }
                if (cp > x.peak_playcount) {
                    x.peak_playcount = cp;
                }
            }
        }
        x.run.push(seq);

        return x;
    }

    public getVariantion() {
        if (this.isCharting()) {
            if (this.isNewEntry()) {
                return {
                    previous: {rank: 'NEW', playcount: 'NEW'},
                    diff: {rank: 'NEW', playcount: 'NEW'},
                    percent: {rank: 'NEW', playcount: 'NEW'},
                };
            } else if (this.isReEntry()) {
                return {
                    previous: {rank: 'RE', playcount: 'RE'},
                    diff: {rank: 'RE', playcount: 'RE'},
                    percent: {rank: 'RE', playcount: 'RE'},
                };
            } else {
                const pr = this.getPrevious().rank as number;
                const cr = this.getCurrent().rank as number;
                const pp = this.getPrevious().playcount as number;
                const cp = this.getCurrent().playcount as number;
                return {
                    previous: {rank: pr, playcount: pp},
                    diff: {rank: (pr - cr), playcount: (cp - pp)},
                    percent: {rank: (pr - cr), playcount: ((cp * 100 / pp) - 100).toFixed(2)},
                };
            }
        } else {
            return {
                rank: 'OUT',
                playcount: 'OUT',
            };
        }
    }

    public getCurrentResume() {
        const resume = {
            total: this.getTotalEntries(),
            current: {
                rank: this.getCurrent().rank,
                playcount: this.getCurrent().playcount,
            },
            stats: this.extract(),
            variation: this.getVariantion(),
            debut: this.getDebut(),
        };

        return resume;
    }

    public getTotalEntries() {
        return this.getEntries().length;
    }

    public chartedOn(index: number) {
        return this.getEntries().includes(index);
    }

    public isCharting() {
        return this.chartedOn(this.index);
    }

    public isNewEntry() {
        return this.getTotalEntries() === 1 && this.isCharting();
    }

    public isReEntry() {
        return this.getTotalEntries() > 1 &&
                this.isCharting() &&
                !this.chartedOn(this.index - 1);
    }

    public isDropOut() {
        return this.chartedOn(this.index - 1) && !this.isCharting();
    }
}

export { Stats, Entry };
