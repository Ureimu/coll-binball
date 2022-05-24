import { initMarble, Marble } from ".";

export interface Stone extends Marble {
    type: "marble:stone";
}

export function marbleStone(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Matter.Sprite {
    const marble = scene.matter.add.sprite(x, y, "acho");
    initMarble(marble, "marble:stone", {
        type: "marble:stone",
        criticallyStrike: true,
        readyToShoot: true,
        damage: 1,
        csDamage: 2
    });
    marble.setScale(0.1, 0.1);
    return marble;
}