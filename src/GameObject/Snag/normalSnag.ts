import { initSnag, Snag } from ".";
import { t } from "../data";

export interface NormalSnag extends Snag {
    type: "snag:normalSnag";
}

export function snagNormalSnag(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Matter.Sprite {
    const snag = scene.matter.add.sprite(x, y, "acho").setScale(0.5, 0.5);
    snag.setBounce(1);
    const initData: NormalSnag = {
        type: "snag:normalSnag",
        durable: 0,
        bounce: 1,
        isCriticallyStrikeSnag: false,
        isRefreshSnag: false
    };
    initSnag(snag, "snag:normalSnag", initData);

    return snag;
}
