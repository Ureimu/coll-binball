import _ from "lodash";
import { t } from "../GameObject/data";
import { NormalSnag } from "../GameObject/Snag/normalSnag";
import { SnagMapData } from "../snagMap/type";

export function refreshSnag(data: SnagMapData): void {
    // refresh refreshSnag and criticallyStrikeSnag
    const refreshSnagNum = 12;
    const criticallyStrikeSnagNum = 12;
    const totalNum = refreshSnagNum + criticallyStrikeSnagNum;
    const normalSnagList = data.snagPairList
        .map(snagPair => {
            return [t.getData(snagPair.mainSnag, t.type(snagPair.mainSnag)), snagPair.mainSnag] as const;
        })
        .filter(([i]) => i && i.type === "snag:normalSnag") as [NormalSnag, Phaser.Physics.Matter.Sprite][];
    normalSnagList.forEach(([i]) => {
        if (i.liveData.isCriticallyStrikeSnag) i.liveData.isCriticallyStrikeSnag = false;
        if (i.liveData.isRefreshSnag) i.liveData.isRefreshSnag = false;
    });
    const randomArray = _.shuffle(normalSnagList).slice(0, totalNum);
    for (let index = 0; index < refreshSnagNum; index++) {
        const element = randomArray[index][0];
        const sprite = randomArray[index][1];
        if (!element) continue;
        element.liveData.isRefreshSnag = true;
        // TODO draw RefreshSnag here
    }
    for (let index = refreshSnagNum; index < totalNum; index++) {
        const element = randomArray[index][0];
        const sprite = randomArray[index][1];
        if (!element) continue;
        element.liveData.isCriticallyStrikeSnag = true;
        // TODO draw CriticallyStrikeSnag here
    }
}
