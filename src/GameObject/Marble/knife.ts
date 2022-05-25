import { initMarble, Marble } from ".";

export interface Knife extends Marble {
    type: "marble:knife";
}
export function marbleKnife(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Matter.Sprite {
    const marble = scene.matter.add.sprite(x, y, "acho");
    initMarble(marble, "marble:knife", {
        type: "marble:knife",
        criticallyStrike: false,
        totalDamage: 0,
        readyToShoot: true,
        damage: 1,
        csDamage: 7
    });

    return marble;
}
