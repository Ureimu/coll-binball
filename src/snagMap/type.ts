import { SnagPair } from "../GameObject/Snag/SnagPair";
import { SnagType } from "../GameObject/Snag/type";
export interface SnagMapUpdateParas {
    tick: number;
    time: number;
    delta: number;
}
export interface SnagMapData {
    initMarblePos: { x: number; y: number }[];
    snagPairList: SnagPair<SnagType>[];
    update?: (paras: SnagMapUpdateParas) => void;
}
