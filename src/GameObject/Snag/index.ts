import { t } from "../data";
import { SpecDataByType } from "../type";
import { SnagType } from "./type";

export interface Snag {
    type: `snag:${string}`;
    durable: number;
    bounce: number;
    isRefreshSnag: boolean;
    isCriticallyStrikeSnag: boolean;
}

export function initSnag<T extends SnagType>(
    snag: Phaser.Physics.Matter.Sprite,
    type: T,
    initData: SpecDataByType<T>
): void {
    snag.setData("type", type);
    t.setTypedData(snag, initData);
    snag.setCircle(30);
    snag.setIgnoreGravity(true);
    snag.setScale(0.3, 0.3);
    snag.setStatic(true);
}
