import { t } from "../../GameObject/data";
import { MarbleKind } from "../../GameObject/Marble/type";

export const shootMarbleFunc = (
    marble: Phaser.Physics.Matter.Sprite,
    graphicsLineForSight: Phaser.GameObjects.Graphics,
    drawLineForSight: (po: Phaser.Input.Pointer) => void,
    scene: Phaser.Scene,
    p: Phaser.Input.InputPlugin
) => {
    return (pointer: Phaser.Input.Pointer) => {
        const marbleData = t.getData(marble, t.type(marble)) as MarbleKind;
        if (marbleData.readyToShoot) {
            marbleData.readyToShoot = false;
            marble.setBounce(1);
            marble.setIgnoreGravity(false);
            console.log("setIgnoreGravity to false");
            const baseVelocity = 15;
            const achoPos = new Phaser.Math.Vector2(marble);
            const pointerPos = new Phaser.Math.Vector2(pointer);
            const curve = new Phaser.Curves.Line(achoPos, pointerPos);
            const angle = curve.getTangent(0).angle();
            const velocity = new Phaser.Math.Vector2(baseVelocity * Math.cos(angle), baseVelocity * Math.sin(angle));
            marble.setVelocity(velocity.x, velocity.y);
            marble.setAwake();
            console.log(marble.body.velocity);
            graphicsLineForSight.clear();
            p.off("pointermove", drawLineForSight, scene);
        }
    };
};
