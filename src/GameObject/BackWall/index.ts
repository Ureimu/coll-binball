import { t } from "../data";
import { BackWallCategory, SnagCategory, SpecDataByType, SubSnagCategory } from "../type";
import { backWallRectangle } from "./rectangle";
import { BackWallType } from "./type";

export interface BackWall {
    type: `backWall:${string}`;
    bounce: number;
}

// eslint-disable-next-line no-bitwise
export const BackWallCollideMask = SubSnagCategory;
export function initBackWall<T extends BackWallType>(
    scene: Phaser.Scene,
    backWall: Phaser.Physics.Matter.Sprite,
    type: T,
    initData: SpecDataByType<T>
): void {
    t.recordType(backWall, type);
    t.setData(backWall, initData);
    // console.log(t.getData(backWall, type));
    // backWall.setBounce(1);
    // backWall.setFriction(0);
    backWall.setCollisionCategory(BackWallCategory);
    backWall.setCollidesWith(BackWallCollideMask);
    backWall.setDepth(0);
}

export const backWallCreatorList: {
    [T in BackWallType]: (scene: Phaser.Scene, x: number, y: number) => Phaser.Physics.Matter.Sprite;
} = {
    "backWall:rectangle": backWallRectangle
};

/**
 * only collide with snaps. Not sure if it's useable.
 *
 * @export
 * @template T
 * @param {T} type
 * @param {Phaser.Scene} scene
 * @param {number} x
 * @param {number} y
 * @returns
 */
export function addBackWall<T extends BackWallType>(type: T, scene: Phaser.Scene, x: number, y: number) {
    const backWall = backWallCreatorList[type](scene, x, y);
    return backWall;
}
