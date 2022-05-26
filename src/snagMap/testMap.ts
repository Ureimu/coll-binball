import { addSnagPair } from "../GameObject/Snag";
import { snagNormalSnag } from "../GameObject/Snag/normalSnag";
import { SnagPair } from "../GameObject/Snag/SnagPair";
import { ArenaBorder } from "../scenes/MainGameScene/createBorder";
import { SnagMapData } from "../scenes/MainGameScene/createSnag";

export function testMap(scene: Phaser.Scene, border: ArenaBorder): SnagMapData {
    const matter = scene.matter;
    //  Create the bricks
    const bricksList: SnagPair[] = [];
    for (let i = 0; i < 200; i++) {
        bricksList.push(
            addSnagPair(
                "snag:normalSnag",
                scene,
                Phaser.Math.Between(border.left, border.right),
                Phaser.Math.Between(border.top, border.bottom)
            )
        );
    }
    return { initMarblePos: [{ x: (border.left + border.right) / 2, y: border.top + 80 }], snagPairList: bricksList };
}
