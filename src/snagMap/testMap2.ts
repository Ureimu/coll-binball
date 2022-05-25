import { NormalSnagData, snagNormalSnag } from "../GameObject/Snag/normalSnag";
import { ArenaBorder } from "../scenes/MainGameScene/createBorder";
import { SnagMapData } from "../scenes/MainGameScene/createSnag";

export function testMap2(scene: Phaser.Scene, border: ArenaBorder): SnagMapData {
    const matter = scene.matter;
    //  Create the bricks
    const bricksList: Phaser.Physics.Matter.Sprite[] = [];
    for (let index = 0; index < 12; index++) {
        const height = border.top + ((border.bottom - border.top) / 20) * (15 - index);
        const left = border.left - (NormalSnagData.radius * NormalSnagData.widthMul) / 2;
        const right = border.right + (NormalSnagData.radius * NormalSnagData.widthMul) / 2;
        const line = new Phaser.Geom.Line(left, height, right, height);
        const numTotal = 30;
        const points = line.getPoints(numTotal);
        for (let i = 0; i < numTotal; i++) {
            const snag = snagNormalSnag(
                scene,
                points[i].x + (index % 2 === 0 ? (right - left) / numTotal / 2 : 0),
                points[i].y
            );
            snag.setVelocity(2.5, 0);
            snag.setIgnoreGravity(true);
            bricksList.push(snag);
        }
    }

    return {
        initMarblePos: [{ x: (border.left + border.right) / 2, y: border.top + 80 }],
        snagList: bricksList,
        update: () => {
            bricksList
                .filter(i => i.body)
                .map(i => [i, i.getBounds()] as const)
                .forEach(([snag, bound]) => {
                    if (bound.left > border.right) {
                        snag.setPosition(border.left - bound.width / 2, snag.y);
                    } else if (bound.right < border.left) {
                        snag.setPosition(border.right + bound.width / 2, snag.y);
                    }
                });
        }
    };
}
