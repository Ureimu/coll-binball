import { addSnagPair } from "../GameObject/Snag";
import { NormalSnagData, snagNormalSnag } from "../GameObject/Snag/normalSnag";
import { SnagPair } from "../GameObject/Snag/SnagPair";
import { ArenaBorder } from "../scenes/MainGameScene/createBorder";
import { SnagMapData } from "../scenes/MainGameScene/createSnag";

export function testMap2(scene: Phaser.Scene, border: ArenaBorder): SnagMapData {
    const matter = scene.matter;
    //  Create the bricks
    const bricksList: SnagPair[] = [];
    for (let index = 0; index < 20; index++) {
        const height = border.top + ((border.bottom - border.top) / 40) * (35 - index);
        const left = border.left - (NormalSnagData.radius * NormalSnagData.widthMul) / 2;
        const right = border.right + (NormalSnagData.radius * NormalSnagData.widthMul) / 2;
        const line = new Phaser.Geom.Line(left, height, right, height);
        const numTotal = 30;
        const points = line.getPoints(numTotal);
        for (let i = 0; i < numTotal; i++) {
            const snagPair = addSnagPair(
                "snag:normalSnag",
                scene,
                points[i].x + (index % 2 === 0 ? (right - left) / numTotal / 2 : 0),
                points[i].y
            );
            snagPair.subSnag.setVelocity(1, 0);
            bricksList.push(snagPair);
        }
    }

    return {
        initMarblePos: [{ x: (border.left + border.right) / 2, y: border.top + 80 }],
        snagPairList: bricksList,
        update: () => {
            bricksList
                .map(i => [i.subSnag, i.subSnag.body.position] as const)
                .forEach(([snag, pos]) => {
                    if (pos.x - NormalSnagData.radius > border.right) {
                        snag.setPosition(border.left - NormalSnagData.radius, snag.y);
                    } else if (pos.x + NormalSnagData.radius < border.left) {
                        snag.setPosition(border.right + NormalSnagData.radius, snag.y);
                    }
                });
        }
    };
}
