import { t } from "../../GameObject/data";
import { MarbleKind, MarbleType } from "../../GameObject/Marble/type";
import { snagPairManager } from "../../GameObject/Snag";
import { SnagPair } from "../../GameObject/Snag/SnagPair";
import { SnagType } from "../../GameObject/Snag/type";
import { SnagMapData } from "../../snagMap/type";
import { damageText } from "../damageText";
import { refreshSnag } from "../refreshSnag";
import { updateScore } from "../updateScore";

export const hitSnagFunc = (
    scene: Phaser.Scene,
    myBallSprite: Phaser.Physics.Matter.Sprite,
    snagMapData: SnagMapData
) => {
    return (pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
        const myBall = myBallSprite.body as MatterJS.BodyType;
        const bodyList = [pair.bodyA, pair.bodyB];
        const myBody = bodyList.find(i => myBall === i);
        if (!myBody) return;
        const otherBody = bodyList.find(i => myBody !== i);
        const snagPair = snagMapData.snagPairList.find(snagPairHere => otherBody === snagPairHere.mainSnag.body);
        if (!snagPair) return;

        // 识别 RefreshSnag和CriticallyStrikeSnag。
        const snagType: SnagType = snagPair.mainSnagType;
        const snagData = snagPair.data("main");
        const marbleType: MarbleType = t.type(myBallSprite) as MarbleType;
        const marbleData = t.getData(myBallSprite, marbleType) as MarbleKind;
        snagData.liveData.collidedNum += 1;

        if (snagType === "snag:normalSnag") {
            if (snagData.liveData.collidedNum > 1) {
                damageText(scene, snagData.liveData.collidedNum, snagPair.subSnag.x - 8, snagPair.subSnag.y - 16);
                return;
            }
            if (snagData.liveData.isCriticallyStrikeSnag) {
                console.log(`hit criticallyStrike snag, criticallyStrike enabled`);
                marbleData.criticallyStrike = true;
            }
            if (snagData.liveData.isRefreshSnag) {
                console.log(`hit refresh snag, refreshing`);
                snagMapData.snagPairList.forEach(snagPairHere => {
                    if (snagPairHere.existMainSnag) return;
                    console.log(`recreateMainSnag`);
                    snagPairHere.recreateMainSnag();
                });
                refreshSnag(snagMapData);
            }
        }
        const increment = updateScore(t.type(myBallSprite) as MarbleType, myBallSprite, snagType, snagPair.mainSnag);
        marbleData.totalDamage += increment;
        damageText(scene, marbleData.totalDamage, snagPair.subSnag.x - 8, snagPair.subSnag.y - 16);
    };
};
