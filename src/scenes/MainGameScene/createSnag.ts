import _ from "lodash";
import { refreshSnag } from "../../events/refreshSnag";
import { t } from "../../GameObject/data";
import { NormalSnag, NormalSnagData } from "../../GameObject/Snag/normalSnag";
import { SnagPair } from "../../GameObject/Snag/SnagPair";
import { testMap2 } from "../../snagMap/testMap2";
import { CacheId } from "../../utils/Cache";
import { ArenaBorder } from "./createBorder";
export interface SnagMapData {
    initMarblePos: { x: number; y: number }[];
    snagPairList: SnagPair[];
    update?: Phaser.Scene["update"];
}
export function createSnag(scene: Phaser.Scene, border: ArenaBorder): SnagMapData {
    const data = testMap2(scene, border);
    refreshSnag(data);
    return data;
}
