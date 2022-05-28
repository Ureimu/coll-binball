import { t } from "../data";
import { MarbleCategory, SnagCategory, SnagWallCategory, SpecDataByType } from "../type";
import { marbleKnife } from "./knife";
import { marbleStone } from "./stone";
import { MarbleType } from "./type";

export interface MarbleInitOpts {
    isStatic: boolean;
}

export interface Marble {
    type: `marble:${string}`;
    criticallyStrike: boolean;
    totalDamage: number;
    damage: number;
    csDamage: number;
    readyToShoot: boolean;
    elasticity: number;
}

export function initMarble<T extends MarbleType>(
    marble: Phaser.Physics.Matter.Sprite,
    type: T,
    initData: SpecDataByType<T>
): void {
    t.recordType(marble, type);
    t.setData(marble, initData);
    marble.setScale(0.12, 0.12);
    marble.setCircle(8);
    marble.setIgnoreGravity(true);
    marble.setInteractive();
    marble.setCollisionCategory(MarbleCategory);
    // eslint-disable-next-line no-bitwise
    marble.setCollidesWith(SnagCategory | SnagWallCategory);
}

const marbleCreatorList: {
    [T in MarbleType]: (scene: Phaser.Scene, x: number, y: number) => Phaser.Physics.Matter.Sprite;
} = {
    "marble:stone": marbleStone,
    "marble:knife": marbleKnife
};

export function addMarble(type: MarbleType, scene: Phaser.Scene, x: number, y: number) {
    return marbleCreatorList[type](scene, x, y);
}
