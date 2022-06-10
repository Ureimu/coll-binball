import { initSnag, Snag } from ".";
import { CacheId } from "../../utils/Cache";
import { t } from "../data";

export interface NormalSnag extends Snag {
    type: "snag:normalSnag";
}
export const NormalSnagData = {
    radius: 12,
    widthMul: 2.4,
    heightMul: 2.4,
    lineWidthMul: 0.2
};

export function snagNormalSnag(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Matter.Sprite {
    // draw graphics
    const { radius } = NormalSnagData;
    const snag = scene.matter.add.sprite(x, y, "normalSnag");
    const initData: NormalSnag = {
        type: "snag:normalSnag",
        durable: 0,
        bounce: 1,
        scoreBonus: 0,
        elasticity: 1,
        liveData: {
            collidedNum: 0,
            isCriticallyStrikeSnag: false,
            isRefreshSnag: false,
            elasticity: 1
        }
    };
    snag.setCircle(radius); // set相关放在init上面
    initSnag(scene, snag, "snag:normalSnag", initData);

    return snag;
}
