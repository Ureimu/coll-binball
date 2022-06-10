import { initMarble, Marble } from ".";

export interface Stone extends Marble {
    type: "marble:stone";
}

export function marbleStone(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Matter.Sprite {
    const marble = scene.matter.add.sprite(x, y, "marble-stone");
    initMarble(marble, "marble:stone", {
        type: "marble:stone",
        criticallyStrike: false,
        totalDamage: 0,
        readyToShoot: true,
        damage: 1,
        csDamage: 2,
        elasticity: 3
    });

    return marble;
}
