import {initSnag} from "./index.js";
import {NormalSnagData} from "./normalSnag.js";
export const SubSnagCategory = 2 ** 30;
export function snagSubSnag(scene, x, y) {
  const graphics = scene.add.graphics();
  const {radius, widthMul, heightMul, lineWidthMul} = NormalSnagData;
  const trailerRadius = radius / 6;
  const width = trailerRadius * widthMul;
  const height = trailerRadius * heightMul;
  const lineWidth = radius * lineWidthMul;
  graphics.fillStyle(6710886, 0.3);
  graphics.fillCircle(width / 2, height / 2, radius);
  graphics.lineStyle(lineWidth, 13421772, 1);
  graphics.strokeCircle(width / 2, height / 2, radius);
  graphics.generateTexture("trailerSnag", width, height);
  graphics.destroy();
  const snag = scene.matter.add.sprite(x, y, "trailerSnag");
  const initData = {
    type: "snag:subSnag",
    durable: 0,
    bounce: 1,
    scoreBonus: 0,
    isCriticallyStrikeSnag: false,
    isRefreshSnag: false
  };
  snag.setCircle(radius);
  initSnag(scene, snag, "snag:subSnag", initData);
  snag.setCollisionCategory(SubSnagCategory);
  return snag;
}
