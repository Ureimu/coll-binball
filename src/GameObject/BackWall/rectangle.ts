import { BackWall, initBackWall } from ".";

export interface Rectangle extends BackWall {
    type: "backWall:rectangle";
}

export function backWallRectangle(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Matter.Sprite {
    // draw graphics
    const graphics = scene.add.graphics();
    const backWall = scene.matter.add.sprite(x, y, "ground", undefined, { isStatic: true }).setScale(1.2, 1.2);
    const initData: Rectangle = {
        type: "backWall:rectangle",
        bounce: 1
    };
    initBackWall(scene, backWall, "backWall:rectangle", initData);
    return backWall;
}
