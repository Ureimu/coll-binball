import { addBackWall } from "../../GameObject/BackWall";
import { t } from "../../GameObject/data";
import { addSnagPair } from "../../GameObject/Snag";
import { NormalSnagData, snagNormalSnag } from "../../GameObject/Snag/normalSnag";
import { SnagPair } from "../../GameObject/Snag/SnagPair";
import { ArenaBorder } from "../../renderer/scenes/MainGameScene/createBorder";
import { SnagMapData } from "../type";
import { ParameterEquationList } from "../utils/ParameterEquation";
import { UpdateLogic } from "../utils/update";

export function wave(scene: Phaser.Scene, border: ArenaBorder): SnagMapData {
    const matter = scene.matter;
    //  Create the bricks
    const bricksList: SnagPair<"snag:normalSnag">[] = [];
    const numTotal = 400;
    const parasList = new ParameterEquationList(numTotal);
    const { circle, line, polyLine, c, mul, add, group, div, time, fractile, range } = parasList;
    const circleF = circle(
        c(50), // 半径为50
        add(
            div(
                time,
                c(10) // 十秒转一圈
            ),
            fractile
        )
    );
    const posCircle = (index: number) =>
        add(
            circleF,
            c(border.center.x + index * 100, border.center.y + index * 100),
            mul(time, { x: c(-45).x, y: c(0).y })
        );
    const parasFunc = polyLine(fractile, ...range(27).map(index => posCircle(index)));
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
