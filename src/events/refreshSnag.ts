import _ from "lodash";
import { NormalSnag } from "../GameObject/Snag/normalSnag";
import { SnagMapData } from "../snagMap/type";
export function refreshSnag(data: SnagMapData): void {
    // refresh refreshSnag and criticallyStrikeSnag
    const refreshSnagNum = 12;
    const criticallyStrikeSnagNum = 12;
    const totalNum = refreshSnagNum + criticallyStrikeSnagNum;
    const normalSnagList = data.snagPairList
        .map(snagPair => {
            return [snagPair.data("main"), snagPair.mainSnag] as const;
        })
        .filter(([i, sprite]) => i && ((sprite && sprite?.scene) || !sprite) && i.type === "snag:normalSnag") as [
        NormalSnag,
        Phaser.Physics.Matter.Sprite | undefined
    ][];
    normalSnagList.forEach(([i, sprite]) => {
        if (i.liveData.isCriticallyStrikeSnag) {
            i.liveData.isCriticallyStrikeSnag = false;
            sprite?.setTexture("normalSnag");
        }
        if (i.liveData.isRefreshSnag) {
            i.liveData.isRefreshSnag = false;
            sprite?.setTexture("normalSnag");
        }
    });
    const randomArray = _.shuffle(normalSnagList).slice(0, totalNum);
    for (let index = 0; index < refreshSnagNum; index++) {
        const element = randomArray[index]?.[0];
        const sprite = randomArray[index]?.[1];
        if (!element) continue;
        element.liveData.isRefreshSnag = true;
        sprite?.setTexture("normalSnag-re");
    }
    for (let index = refreshSnagNum; index < totalNum; index++) {
        const element = randomArray[index]?.[0];
        const sprite = randomArray[index]?.[1];
        if (!element) continue;
        element.liveData.isCriticallyStrikeSnag = true;
        sprite?.setTexture("normalSnag-cs");
    }
}
