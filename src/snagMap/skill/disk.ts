import { addBackWall } from "../../GameObject/BackWall";
import { t } from "../../GameObject/data";
import { addSnagPair } from "../../GameObject/Snag";
import { NormalSnagData, snagNormalSnag } from "../../GameObject/Snag/normalSnag";
import { SnagPair } from "../../GameObject/Snag/SnagPair";
import { ArenaBorder } from "../../renderer/scenes/MainGameScene/createBorder";
import { SnagMapData } from "../type";
import { ParameterEquationList } from "../utils/ParameterEquation";
import { UpdateLogic } from "../utils/update";

export function disk(scene: Phaser.Scene, border: ArenaBorder): SnagMapData {
    const matter = scene.matter;
    //  Create the bricks
    const bricksList: SnagPair<"snag:normalSnag">[] = [];
    const numTotal = 500;
    const parasList = new ParameterEquationList(numTotal, scene.time.now);
    const { circle, line, polyLine, c, mul, add, group, div, time, fractile, range, sin } = parasList;
    const center = c(border.center.x, border.center.y);
    const parasFunc = group(
        ...range(15).map(i =>
            add(
                center,
                circle(
                    mul(
                        c(300),
                        sin(
                            div(add(time, c(i * 0.15)), c(10)) // test
                        )
                    ),
                    add(fractile)
                    // test
                )
            )
        )
    );
    for (let i = 0; i < numTotal; i++) {
        const pos = parasList.pos(i, 0, parasFunc);
        const snagPair = addSnagPair("snag:normalSnag", scene, pos.x, pos.y);
        bricksList.push(snagPair);
    }

    const updateLogic = new UpdateLogic(bricksList, border);
    return {
        initMarblePos: [{ x: (border.left + border.right) / 2, y: border.top + 80 }],
        snagPairList: bricksList,
        update: paras => {
            updateLogic.curveMove((pair, index) => parasList.pos(index, paras.time, parasFunc));
            updateLogic.mirrorShuttle(true, true);
        }
    };
}
