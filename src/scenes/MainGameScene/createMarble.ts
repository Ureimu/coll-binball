import _ from "lodash";
import { hitSnagFunc } from "../../events/onCollide/hitSnag";
import { drawLineForSightFunc } from "../../events/pointermove/drawLineForSight";
import { shootMarbleFunc } from "../../events/pointerup/shootMarble";
import { addMarble } from "../../GameObject/Marble";
import { marbleStone } from "../../GameObject/Marble/stone";
import { MarbleType } from "../../GameObject/Marble/type";
import { SnagMapData } from "./createSnag";

export function createMarble(scene: Phaser.Scene, snagMapData: SnagMapData): Phaser.Physics.Matter.Sprite {
    const graphicsLineForSight = scene.add.graphics();
    graphicsLineForSight.lineStyle(2, 0x00ff00, 1.0);
    const initPos = snagMapData.initMarblePos[0];
    const marble = addMarble(
        _.shuffle(["marble:stone", "marble:knife"] as MarbleType[])[0],
        scene,
        initPos.x,
        initPos.y
    );
    const hitSnag = hitSnagFunc(scene, marble, snagMapData.snagList);
    marble.setOnCollide(hitSnag);

    //  Input events
    const drawLineForSight = drawLineForSightFunc(marble, graphicsLineForSight);
    const p = scene.input.on("pointermove", drawLineForSight, scene);
    scene.input.on("pointerup", shootMarbleFunc(marble, graphicsLineForSight, drawLineForSight, scene, p), scene);

    return marble;
}
