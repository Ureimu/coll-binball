import { hitSnagFunc } from "../../events/onCollide/hitSnag";
import { drawLineForSightFunc } from "../../events/pointermove/drawLineForSight";
import { shootMarbleFunc } from "../../events/pointerup/shootMarble";
import { marbleStone } from "../../GameObject/Marble/stone";
import { SnagMapData } from "./createSnag";

export function createMarble(scene: Phaser.Scene, snagMapData: SnagMapData): Phaser.Physics.Matter.Sprite {
    const graphicsLineForSight = scene.add.graphics();
    graphicsLineForSight.lineStyle(2, 0x00ff00, 1.0);
    const initPos = snagMapData.initMarblePos[0];
    const marble = marbleStone(scene, initPos.x, initPos.y);
    const hitSnag = hitSnagFunc(scene, marble, snagMapData.snagList);
    marble.setOnCollideEnd(hitSnag);

    //  Input events
    const drawLineForSight = drawLineForSightFunc(marble, graphicsLineForSight);
    const p = scene.input.on("pointermove", drawLineForSight, scene);
    scene.input.on("pointerup", shootMarbleFunc(marble, graphicsLineForSight, drawLineForSight, scene, p), scene);

    return marble;
}
