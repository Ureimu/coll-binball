import _ from "lodash";
import { refreshSnag } from "@/events/refreshSnag";
import { t } from "@/GameObject/data";
import { NormalSnag, NormalSnagData } from "@/GameObject/Snag/normalSnag";
import { testMap3 } from "@/snagMap/example/curveMove";
import { testMap2 } from "@/snagMap/example/mirrorShuttle";
import { CacheId } from "@/utils/Cache";
import { ArenaBorder } from "./createBorder";
import { SnagMapData } from "@/snagMap/type";
import { testMap4 } from "@/snagMap/example/paraEquation";
export function createSnag(
    scene: Phaser.Scene,
    border: ArenaBorder,
    snagFunc: (sceneH: Phaser.Scene, borderH: ArenaBorder) => SnagMapData
): SnagMapData {
    const data = snagFunc(scene, border);
    refreshSnag(data);
    return data;
}
