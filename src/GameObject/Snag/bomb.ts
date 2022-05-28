import { initSnag, Snag } from ".";
import { NormalSnagData } from "./normalSnag";

export interface Bomb extends Snag {
    type: "snag:bomb";
    kickTime: number;
}

export function snagBomb(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Matter.Sprite {
    // draw graphics
    const graphics = scene.add.graphics();
    const { radius, widthMul, heightMul, lineWidthMul } = NormalSnagData;
    const width = radius * widthMul;
    const height = radius * heightMul;
    const lineWidth = radius * lineWidthMul;
    graphics.fillStyle(0x666666, 0.3);
    graphics.fillCircle(width / 2, height / 2, radius);
    graphics.lineStyle(lineWidth, 0xcccccc, 1);
    graphics.strokeCircle(width / 2, height / 2, radius);
    // 由几何图画生成纹理，由纹理生成Image，销毁几何图画
    graphics.generateTexture("normalSnag", width, height);
    graphics.destroy();

    const snag = scene.matter.add.sprite(x, y, "normalSnag");
    const initData: Bomb = {
        type: "snag:bomb",
        kickTime: 0,
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
    initSnag(scene, snag, "snag:bomb", initData);

    return snag;
}
