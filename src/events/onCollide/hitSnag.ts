import { t } from "../../GameObject/data";
import { updateScore } from "../updateScore";

export const hitSnagFunc = (
    scene: Phaser.Scene,
    myBallSprite: Phaser.Physics.Matter.Sprite,
    bricksList: Phaser.Physics.Matter.Sprite[]
) => {
    return (pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
        const myBall = myBallSprite.body as MatterJS.BodyType;
        const bodyList = [pair.bodyA, pair.bodyB];
        const myBody = bodyList.find(i => myBall === i);
        if (!myBody) return;
        const otherBody = bodyList.find(i => myBody !== i);
        const brick = bricksList.find(brickHere => otherBody === brickHere.body);
        if (!brick) return;

        // 识别 RefreshSnag和CriticallyStrikeSnag。
        const brickType = t.type(brick);
        if (brickType === "snag:normalSnag") {
            const i = t.getTypedData(brick, brickType);
            if (i.isCriticallyStrikeSnag) {
                // TODO updateScore
                updateScore();
            }
            if (i.isRefreshSnag) {
                // TODO refreshSnag
            }
        }
        // scene.matter.applyForceFromPosition(myBody, brick.body.position, 0.0001);
        brick.destroy();
        console.log(`remove brick`);
        updateScore();
    };
};
