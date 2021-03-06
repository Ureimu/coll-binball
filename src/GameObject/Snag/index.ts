import { t } from "../data";

import { BackWallCategory, MarbleCategory, NullCategory, SnagCategory, SpecDataByType } from "../type";
import { snagBomb } from "./bomb";
import { snagNormalSnag } from "./normalSnag";
import { SnagPair } from "./SnagPair";
import { SnagPairManager } from "./SnagPair/manager";
import { snagSubSnag } from "./subSnag";
import { SnagType } from "./type";
import { snagWall } from "./wall";

export interface Snag {
    type: `snag:${string}`;
    durable: number;
    bounce: number;
    scoreBonus: number;
    elasticity: number;
    liveData: {
        collidedNum: number;
        snagDestroyTimeOut?: NodeJS.Timeout;
        isRefreshSnag: boolean;
        isCriticallyStrikeSnag: boolean;
        elasticity: number;
    };
}

// eslint-disable-next-line no-bitwise
export const SnagCollideMask = MarbleCategory;
// !WARNING: if you want snag change its velocity when collusion, please remember to set SubSnagCollideMask, not set SnagCollideMask.
export const SnagCollideMaskOnNotExist = NullCategory;
export function initSnag<T extends SnagType>(
    scene: Phaser.Scene,
    snag: Phaser.Physics.Matter.Sprite,
    type: T,
    initData: SpecDataByType<T>
): void {
    t.recordType(snag, type);
    t.setData(snag, initData);
    // console.log(t.getData(snag, type));
    // snag.setFriction(0);
    // snag.setStatic(true);
    snag.setFrictionAir(0);
    snag.setIgnoreGravity(true);
    snag.setBounce(initData.bounce);
    snag.setMass(1e20); // 让碰撞的动量几乎完整的返回给marble
    snag.setCollisionCategory(SnagCategory);
    snag.setCollidesWith(SnagCollideMask);
    snag.setDepth(0);
}

export const snagCreatorList: {
    [T in SnagType]: (scene: Phaser.Scene, x: number, y: number) => Phaser.Physics.Matter.Sprite;
} = {
    "snag:normalSnag": snagNormalSnag,
    "snag:subSnag": snagSubSnag,
    "snag:wall": snagWall,
    "snag:bomb": snagBomb
};

export const snagPairManager = new SnagPairManager();

export function addSnagPair<T extends SnagType>(type: T, scene: Phaser.Scene, x: number, y: number): SnagPair<T> {
    const mainSnag = snagCreatorList[type](scene, x, y);
    const pair = new SnagPair<T>(mainSnag);
    snagPairManager.add(pair);
    return pair;
}
