import { snagNormalSnag } from "../GameObject/Snag/normalSnag";
import { ArenaBorder } from "../scenes/MainGameScene/createBorder";
import { SnagMapData } from "../scenes/MainGameScene/createSnag";

export function testMap(scene: Phaser.Scene, border: ArenaBorder): SnagMapData {
    const matter = scene.matter;
    //  Create the bricks
    const bricksList: Phaser.Physics.Matter.Sprite[] = [];
    for (let i = 0; i < 100; i++) {
        bricksList.push(
            snagNormalSnag(
                scene,
                Phaser.Math.Between(border.left, border.right),
                Phaser.Math.Between(border.top, border.bottom)
            )
        );
    }
    return { initMarblePos: [{ x: (border.left + border.right) / 2, y: border.top + 80 }], snagList: bricksList };
}
