import {addSnagPair} from "../../GameObject/Snag/index.js";
import {NormalSnagData} from "../../GameObject/Snag/normalSnag.js";
import {UpdateLogic} from "../utils/update/index.js";
export function testMap2(scene, border) {
  const matter = scene.matter;
  const bricksList = [];
  for (let index = 0; index < 20; index++) {
    const height = border.top + (border.bottom - border.top) / 40 * (35 - index);
    const left = border.left - NormalSnagData.radius * NormalSnagData.widthMul / 2;
    const right = border.right + NormalSnagData.radius * NormalSnagData.widthMul / 2;
    const line = new Phaser.Geom.Line(left, height, right, height);
    const numTotal = 30;
    const points = line.getPoints(numTotal);
    for (let i = 0; i < numTotal; i++) {
      const snagPair = addSnagPair("snag:normalSnag", scene, points[i].x + (index % 2 === 0 ? (right - left) / numTotal / 2 : 0), points[i].y);
      snagPair.subSnag.setVelocity(1, 0);
      bricksList.push(snagPair);
    }
  }
  const updateLogic = new UpdateLogic(bricksList, border);
  return {
    initMarblePos: [{x: (border.left + border.right) / 2, y: border.top + 80}],
    snagPairList: bricksList,
    update: () => {
      updateLogic.mirrorShuttle();
    }
  };
}
