import _ from "lodash";
import { hitSnagFunc } from "../../events/onCollide/hitSnag";
import { benefitVelocityFunc } from "../../events/onCollideEnd/benefitVelocity";
import { drawLineForSightFunc } from "../../events/pointermove/drawLineForSight";
import { shootMarbleFunc } from "../../events/pointerup/shootMarble";
import { addMarble } from "../../GameObject/Marble";
import { MarbleKind, MarbleType } from "../../GameObject/Marble/type";
import { SnagMapData } from "../../snagMap/type";

export function createMarble(scene: Phaser.Scene, snagMapData: SnagMapData): Phaser.Physics.Matter.Sprite {
    const graphicsLineForSight = scene.add.graphics();
    graphicsLineForSight.lineStyle(2, 0xccaacc, 1.0);
    const initPos = _.shuffle(snagMapData.initMarblePos)[0];
    const marble = addMarble(
        _.shuffle(["marble:stone", "marble:knife"] as MarbleType[])[0],
        scene,
        initPos.x,
        initPos.y
    );
    const hitSnag = hitSnagFunc(scene, marble, snagMapData);
    marble.setOnCollide(hitSnag);
    const benefitVelocity = benefitVelocityFunc(scene, marble, snagMapData);
    marble.setOnCollideEnd(benefitVelocity);
    //  Input events
    const drawLineForSight = drawLineForSightFunc(marble, graphicsLineForSight);
    const p = scene.input.on("pointermove", drawLineForSight, scene);
    scene.input.on("pointerup", shootMarbleFunc(marble, graphicsLineForSight, drawLineForSight, scene, p), scene);
    return marble;
}
