import { Snag } from ".";

export interface Wall extends Snag {
    type: "snag:wall";
    kickTime: number;
}
