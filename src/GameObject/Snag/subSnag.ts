import { initSnag, Snag } from ".";
import { t } from "../data";
import { NormalSnagData } from "./normalSnag";

export interface SubSnag extends Snag {
    type: "snag:subSnag";
}
export const SubSnagCategory = 2 ** 30;
export function snagSubSnag(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Matter.Sprite {
    // draw graphics
    const graphics = scene.add.graphics();
    const { radius, widthMul, heightMul, lineWidthMul } = NormalSnagData;
    const trailerRadius = radius / 6;
    const width = trailerRadius * widthMul;
    const height = trailerRadius * heightMul;
    const lineWidth = radius * lineWidthMul;
    graphics.fillStyle(0x666666, 0.3);
    graphics.fillCircle(width / 2, height / 2, radius);
    graphics.lineStyle(lineWidth, 0xcccccc, 1);
    graphics.strokeCircle(width / 2, height / 2, radius);
    // 由几何图画生成纹理，由纹理生成Image，销毁几何图画
    graphics.generateTexture("trailerSnag", width, height);
    graphics.destroy();

    const snag = scene.matter.add.sprite(x, y, "trailerSnag");
    const initData: SubSnag = {
        type: "snag:subSnag",
        durable: 0,
        bounce: 1,
        scoreBonus: 0,
        isCriticallyStrikeSnag: false,
        isRefreshSnag: false
    };
    snag.setCircle(radius); // set相关放在init上面
    initSnag(scene, snag, "snag:subSnag", initData);
    snag.setCollisionCategory(SubSnagCategory);
    return snag;
}
