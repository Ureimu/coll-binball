import { initSnag, Snag } from ".";
import { CacheId } from "../../utils/Cache";
import { t } from "../data";

export interface NormalSnag extends Snag {
    type: "snag:normalSnag";
}
export const NormalSnagData = {
    radius: 8,
    widthMul: 2.4,
    heightMul: 2.4,
    lineWidthMul: 0.2
};
const cache = new CacheId((scene: Phaser.Scene) => {
    const graphics = scene.add.graphics();
    const { radius, widthMul, heightMul, lineWidthMul } = NormalSnagData;
    const width = radius * widthMul;
    const height = radius * heightMul;
    const lineWidth = radius * lineWidthMul;
    graphics.fillStyle(0xccddcc, 0.3);
    graphics.fillCircle(width / 2, height / 2, radius);
    // graphics.lineStyle(lineWidth, 0xcccccc, 1);
    // graphics.strokeCircle(width / 2, height / 2, radius);
    // 由几何图画生成纹理，由纹理生成Image，销毁几何图画
    graphics.generateTexture("normalSnag", width, height);
    graphics.destroy();
});
export function snagNormalSnag(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Matter.Sprite {
    // draw graphics
    cache.get(1, scene);
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
