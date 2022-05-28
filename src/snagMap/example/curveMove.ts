import { addBackWall } from "../../GameObject/BackWall";
import { t } from "../../GameObject/data";
import { addSnagPair } from "../../GameObject/Snag";
import { NormalSnagData, snagNormalSnag } from "../../GameObject/Snag/normalSnag";
import { SnagPair } from "../../GameObject/Snag/SnagPair";
import { ArenaBorder } from "../../scenes/MainGameScene/createBorder";
import { SnagMapData } from "../type";
import { UpdateLogic } from "../utils/update";

export function testMap3(scene: Phaser.Scene, border: ArenaBorder): SnagMapData {
    const matter = scene.matter;
    //  Create the bricks
    const bricksList: SnagPair<"snag:normalSnag">[] = [];
    const maxIndex = 9;
    for (let index = 0; index < maxIndex; index++) {
        const height = border.top + (border.bottom - border.top) * (0.4 + index * (0.5 / maxIndex));
        const left = border.left - (NormalSnagData.radius * NormalSnagData.widthMul) / 2;
        const right = border.right + (NormalSnagData.radius * NormalSnagData.widthMul) / 2;
        const line = new Phaser.Geom.Line(left, height, right, height);
        const numTotal = 60;
        const points = line.getPoints(numTotal);
        for (let i = 0; i < numTotal; i++) {
            const snagPair = addSnagPair("snag:normalSnag", scene, points[i].x, points[i].y);
            bricksList.push(snagPair);
        }
    }

    const updateLogic = new UpdateLogic(bricksList, border);
    return {
        initMarblePos: [{ x: (border.left + border.right) / 2, y: border.top + 80 }],
        snagPairList: bricksList,
        update: paras => {
            updateLogic.curveMove((pair, index) => {
                // console.log(pair.data("sub"));
                const startPos = pair.data("sub").startPos;
                //
                const timeScale = (paras.time / 1000) * 60 - index * 6;
                return {
                    x: startPos.x + timeScale + 30 * Math.cos(Math.PI * ((timeScale / 60) * 0.5 + index / 12)),
                    y: startPos.y + 60 * Math.sin(Math.PI * ((timeScale / 60) * 0.5 + index / 12))
                };
            });
            updateLogic.mirrorShuttle(false);
        }
    };
}
