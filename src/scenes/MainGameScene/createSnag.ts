import _ from "lodash";
import { t } from "../../GameObject/data";
import { NormalSnag } from "../../GameObject/Snag/normalSnag";
import { testMap } from "../../snagMap/testMap";
import { ArenaBorder } from "./createBorder";
export interface SnagMapData {
    initMarblePos: { x: number; y: number }[];
    snagList: Phaser.Physics.Matter.Sprite[];
}
export function createSnag(scene: Phaser.Scene, border: ArenaBorder): SnagMapData {
    const data = testMap(scene, border);

    // refresh refreshSnag and criticallyStrikeSnag
    const refreshSnagNum = 3;
    const criticallyStrikeSnagNum = 3;
    const totalNum = refreshSnagNum + criticallyStrikeSnagNum;
    const normalSnagList = data.snagList
        .map(i => {
            console.log([t.getTypedData(i, t.type(i)), i]);
            return [t.getTypedData(i, t.type(i)), i] as const;
        })
        .filter(([i]) => i && i.type === "snag:normalSnag") as [NormalSnag, Phaser.Physics.Matter.Sprite][];
    normalSnagList.forEach(([i]) => {
        if (i.isCriticallyStrikeSnag) i.isCriticallyStrikeSnag = false;
        if (i.isRefreshSnag) i.isRefreshSnag = false;
    });
    console.log(normalSnagList.length);
    const randomArray = _.shuffle(normalSnagList).slice(0, totalNum);
    for (let index = 0; index < refreshSnagNum; index++) {
        const element = randomArray[index][0];
        const sprite = randomArray[index][1];
        element.isRefreshSnag = true;
        // TODO draw RefreshSnag here
    }
    for (let index = refreshSnagNum; index < totalNum; index++) {
        const element = randomArray[index][0];
        const sprite = randomArray[index][1];
        element.isCriticallyStrikeSnag = true;
        // TODO draw CriticallyStrikeSnag here
    }

    return data;
}