import { ArchiveType } from "./type";

export class Archive {
    public constructor(public id: number) {}
    private key = (name: string) => `${this.id}-${name}`;
    private defaultArchive: ArchiveType = {
        stats: {
            playTimeTotal: 0,
            damageTotal: 0
        }
    };
    private cache: ArchiveType | undefined = undefined;
    public get data(): ArchiveType {
        if (!this.cache) {
            this.cache = (JSON.parse(localStorage.getItem(this.key("cache")) ?? "{}") ??
                this.defaultArchive) as ArchiveType;
        }
        return this.cache;
    }
    public save(): void {
        localStorage.setItem(this.key("cache"), JSON.stringify(this.cache));
    }
}
