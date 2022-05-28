import {addSnagPair} from "../../GameObject/Snag/index.js";
import {NormalSnagData} from "../../GameObject/Snag/normalSnag.js";
import {UpdateLogic} from "../utils/update/index.js";
export function testMap3(scene, border) {
  const matter = scene.matter;
  const bricksList = [];
  const height = border.top + (border.bottom - border.top) / 2;
  const left = border.left - NormalSnagData.radius * NormalSnagData.widthMul / 2;
  const right = border.right + NormalSnagData.radius * NormalSnagData.widthMul / 2;
  const line = new Phaser.Geom.Line(left, height, right, height);
  const numTotal = 60;
  const points = line.getPoints(numTotal);
  for (let i = 0; i < numTotal; i++) {
    const snagPair = addSnagPair("snag:normalSnag", scene, points[i].x, points[i].y);
    bricksList.push(snagPair);
  }
  const updateLogic = new UpdateLogic(bricksList, border);
  return {
    initMarblePos: [{x: (border.left + border.right) / 2, y: border.top + 80}],
    snagPairList: bricksList,
    update: (paras) => {
      updateLogic.curveMove((pair, index) => {
        const startPos = pair.data("sub").startPos;
        const timeScale = paras.time / 1e3 * 60 - index * 0.2;
        return {
          x: startPos.x + timeScale + 30 * Math.cos(Math.PI * (timeScale / 60 * 0.5 + index / 3)),
          y: startPos.y + 60 * Math.sin(Math.PI * (timeScale / 60 * 0.5 + index / 3))
        };
      });
      updateLogic.mirrorShuttle(false);
    }
  };
}
