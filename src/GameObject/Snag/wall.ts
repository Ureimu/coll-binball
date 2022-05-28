import { initSnag, Snag } from ".";
import { SnagWallCategory, MarbleCategory } from "../type";

export interface Wall extends Snag {
    type: "snag:wall";
    kickTime: number;
}

export function snagWall(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Matter.Sprite {
    const snag = scene.matter.add.sprite(x, y, "ground");
    const initData: Wall = {
        type: "snag:wall",
        durable: 0,
        bounce: 1,
        scoreBonus: 0,
        kickTime: 0,
        elasticity: 1,
        liveData: {
            collidedNum: 0,
            elasticity: 1,
            isCriticallyStrikeSnag: false,
            isRefreshSnag: false
        }
    };
    initSnag(scene, snag, "snag:wall", initData);
    snag.setCollisionCategory(SnagWallCategory);
    snag.setCollidesWith(MarbleCategory);
    snag.setDepth(1);
    return snag;
}
