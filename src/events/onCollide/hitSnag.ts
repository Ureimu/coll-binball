import { t } from "../../GameObject/data";
import { MarbleKind, MarbleType } from "../../GameObject/Marble/type";
import { SnagCollideMask, SnagCollideMaskOnNotExist } from "../../GameObject/Snag";
import { SnagType } from "../../GameObject/Snag/type";
import { damageText } from "../damageText";
import { updateScore } from "../updateScore";

export const hitSnagFunc = (
    scene: Phaser.Scene,
    myBallSprite: Phaser.Physics.Matter.Sprite,
    bricksList: Phaser.Physics.Matter.Sprite[]
) => {
    return (pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
        console.log(pair.collision.collided);
        const myBall = myBallSprite.body as MatterJS.BodyType;
        const bodyList = [pair.bodyA, pair.bodyB];
        const myBody = bodyList.find(i => myBall === i);
        if (!myBody) return;
        const otherBody = bodyList.find(i => myBody !== i);
        const snag = bricksList.find(brickHere => otherBody === brickHere.body);
        if (!snag) return;

        // 识别 RefreshSnag和CriticallyStrikeSnag。
        const snagType: SnagType = t.type(snag) as SnagType;
        const snagData = t.getData(snag, snagType);
        const marbleType: MarbleType = t.type(myBallSprite) as MarbleType;
        const marbleData = t.getData(myBallSprite, marbleType) as MarbleKind;
        if (snagType === "snag:normalSnag") {
            if (snagData.isCriticallyStrikeSnag) {
                marbleData.criticallyStrike = true;
            }
            if (snagData.isRefreshSnag) {
                bricksList.forEach(snagHere => {
                    snagHere.setCollidesWith(SnagCollideMask);
                    snagHere.visible = true;
                });
            }
        }
        const increment = updateScore(t.type(myBallSprite) as MarbleType, myBallSprite, snagType, snag);
        marbleData.totalDamage += increment;
        damageText(scene, marbleData.totalDamage, snag.x - 8, snag.y - 16);
        console.log(`remove brick`);
        snag.setCollidesWith(SnagCollideMaskOnNotExist);
        snag.visible = false;
    };
};
