import { NullCategory } from "..";
import { t } from "../data";
import { MarbleCategory } from "../Marble";
import { SpecDataByType } from "../type";
import { snagSubSnag } from "./subSnag";
import { SnagType } from "./type";

export interface Snag {
    type: `snag:${string}`;
    durable: number;
    bounce: number;
    scoreBonus: number;
    isRefreshSnag: boolean;
    isCriticallyStrikeSnag: boolean;
}
export const SnagCategory = 2 ** 0;
export const SnagCollideMask = MarbleCategory;
export const SnagCollideMaskOnNotExist = NullCategory;
export function initSnag<T extends SnagType>(
    scene: Phaser.Scene,
    snag: Phaser.Physics.Matter.Sprite,
    type: T,
    initData: SpecDataByType<T>
): void {
    t.recordType(snag, type);
    t.setData(snag, initData);
    console.log(t.getData(snag, type));
    snag.setFrictionAir(0);
    snag.setFrictionStatic(1);
    snag.setIgnoreGravity(true);
    snag.setMass(1e20);
    snag.setCollisionCategory(SnagCategory);
    snag.setCollidesWith(SnagCollideMask);
    snag.setDepth(0);
}
