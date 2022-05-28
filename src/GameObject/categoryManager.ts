import { CacheId } from "../utils/Cache";

class CategoryManager {
    public cacheN2S: Map<number, string> = new Map<number, string>();
    public cacheS2N: Map<string, number> = new Map<string, number>();
    public constructor() {
        return;
    }
    public setCategory(categoryType: string, categoryNum: number) {
        if (this.cacheN2S.has(categoryNum) || this.cacheS2N.has(categoryType)) {
            throw new Error("this categoryType or categoryNum had been set");
        } else {
            this.cacheN2S.set(categoryNum, categoryType);
            this.cacheS2N.set(categoryType, categoryNum);
        }
    }
    public getCategory(categoryType: string): number {
        const getNum = this.cacheS2N.get(categoryType);
        if (!getNum) throw new Error("this categoryType had not been set");
        return getNum;
    }
}
export const categoryManager = new CategoryManager();
