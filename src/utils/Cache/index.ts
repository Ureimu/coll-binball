export class CacheId<T extends (...args: any[]) => unknown> {
    public constructor(public getter: T) {}
    private cache: { [id: string]: ReturnType<T> } = {};
    public get(id: string | number, ...paras: Parameters<T>): ReturnType<T> {
        if (!this.cache[id]) {
            this.cache[id] = this.getter(...paras) as ReturnType<T>;
        }
        return this.cache[id];
    }
}
