import {addSnagPair} from "../../GameObject/Snag/index.js";
export function testMap(scene, border) {
  const matter = scene.matter;
  const bricksList = [];
  for (let i = 0; i < 200; i++) {
    bricksList.push(addSnagPair("snag:normalSnag", scene, Phaser.Math.Between(border.left, border.right), Phaser.Math.Between(border.top, border.bottom)));
  }
  return {initMarblePos: [{x: (border.left + border.right) / 2, y: border.top + 80}], snagPairList: bricksList};
}
