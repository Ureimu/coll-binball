import { Snag } from ".";

export interface Bomb extends Snag {
    type: "snag:bomb";
    kickTime: number;
    readonly isRefreshSnag: false;
    readonly isCriticallyStrikeSnag: false;
}
