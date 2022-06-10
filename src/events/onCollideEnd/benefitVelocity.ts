import { t } from "../../GameObject/data";
import { MarbleKind, MarbleType } from "../../GameObject/Marble/type";
import { snagPairManager } from "../../GameObject/Snag";
import { SnagPair } from "../../GameObject/Snag/SnagPair";
import { SnagType } from "../../GameObject/Snag/type";
import { SnagMapData } from "../../snagMap/type";
import { damageText } from "../damageText";
import { refreshSnag } from "../refreshSnag";
import { updateScore } from "../updateScore";

export const benefitVelocityFunc = (
    scene: Phaser.Scene,
    myBallSprite: Phaser.Physics.Matter.Sprite,
    snagMapData: SnagMapData
) => {
    return (pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
        const myBall = myBallSprite.body as MatterJS.BodyType;
        const bodyList = [pair.bodyA, pair.bodyB];
        const myBody = bodyList.find(i => myBall === i);
        const myBodyIndex = bodyList.findIndex(i => myBall === i);
        if (!myBody) return;
        const otherBody = bodyList.find(i => myBody !== i);
        const snagPair = snagMapData.snagPairList.find(snagPairHere => otherBody === snagPairHere.mainSnag.body);
        if (!snagPair) return;
        // 识别 RefreshSnag和CriticallyStrikeSnag。
        const snagType: SnagType = snagPair.mainSnagType;
        const snagData = snagPair.data("main");
        const marbleType: MarbleType = t.type(myBallSprite) as MarbleType;
        const marbleData = t.getData(myBallSprite, marbleType) as MarbleKind;

        snagData.liveData.elasticity = snagData.elasticity * 2 ** -(snagData.liveData.collidedNum - 1);
        // console.log(snagData.elasticity.toFixed(2));

        const benefitVelocity = marbleData.elasticity * snagData.liveData.elasticity;
        const myBallVelocity = new Phaser.Math.Vector2(myBall.velocity);
        if (benefitVelocity * 2.5 > myBallVelocity.length()) {
            const vector = new Phaser.Math.Vector2(pair.collision.penetration);
            const direction = myBodyIndex === 0 ? 1 : -1;
            const benefit = vector.scale(direction * (1 / vector.length()) * benefitVelocity);
            // console.log(myBallVelocity, benefit, myBallVelocity.x + benefit.x, myBallVelocity.y + benefit.y);
            myBallSprite.setVelocity(myBallVelocity.x + benefit.x, myBallVelocity.y + benefit.y);
        }
        snagPair.destroyMainSnag(100);
    };
};
