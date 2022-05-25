import { initSnag, Snag } from ".";
import { MarbleCategory } from "../Marble";

export interface Wall extends Snag {
    type: "snag:wall";
    kickTime: number;
}
export const SnagWallCategory = 2 ** 1;

export function snagWall(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Matter.Sprite {
    const snag = scene.matter.add.sprite(x, y, "ground");
    const initData: Wall = {
        type: "snag:wall",
        durable: 0,
        bounce: 1,
        scoreBonus: 0,
        isCriticallyStrikeSnag: false,
        isRefreshSnag: false,
        kickTime: 0
    };
    initSnag(scene, snag, "snag:wall", initData);
    snag.setCollisionCategory(SnagWallCategory);
    snag.setCollidesWith(MarbleCategory);
    snag.setDepth(1);
    return snag;
}
