import {t} from "../data.js";
import {BackWallCategory, SubSnagCategory} from "../type.js";
import {backWallRectangle} from "./rectangle.js";
export const BackWallCollideMask = SubSnagCategory;
export function initBackWall(scene, backWall, type, initData) {
  t.recordType(backWall, type);
  t.setData(backWall, initData);
  console.log(t.getData(backWall, type));
  backWall.setCollisionCategory(BackWallCategory);
  backWall.setCollidesWith(BackWallCollideMask);
  backWall.setDepth(0);
}
export const backWallCreatorList = {
  "backWall:rectangle": backWallRectangle
};
export function addBackWall(type, scene, x, y) {
  const backWall = backWallCreatorList[type](scene, x, y);
  return backWall;
}
