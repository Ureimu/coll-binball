import { t } from "../data";
import { SpecDataByType } from "../type";
import { MarbleType } from "./type";

export interface MarbleInitOpts {
    isStatic: boolean;
}

export interface Marble {
    type: `marble:${string}`;
    criticallyStrike: boolean;
    damage: number;
    csDamage: number;
    readyToShoot: boolean;
}
export function initMarble<T extends MarbleType>(
    marble: Phaser.Physics.Matter.Sprite,
    type: T,
    initData: SpecDataByType<T>
): void {
    marble.setData("type", type);
    t.setTypedData(marble, initData);
    marble.setCircle(10);
    marble.setIgnoreGravity(true);
    marble.setInteractive();
    marble.setData("readyToShoot", true);
}
