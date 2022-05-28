import {initBackWall} from "./index.js";
export function backWallRectangle(scene, x, y) {
  const graphics = scene.add.graphics();
  const backWall = scene.matter.add.sprite(x, y, "ground", void 0, {isStatic: true}).setScale(1.2, 1.2);
  const initData = {
    type: "backWall:rectangle",
    bounce: 1
  };
  initBackWall(scene, backWall, "backWall:rectangle", initData);
  return backWall;
}
