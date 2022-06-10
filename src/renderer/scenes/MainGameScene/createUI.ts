import { skillList } from "../../../snagMap/skill";
import { SnagMapData } from "../../../snagMap/type";
import { ArenaBorder } from "./createBorder";

export function createUI(
    scene: Phaser.Scene,
    border: ArenaBorder
): (sceneH: Phaser.Scene, borderH: ArenaBorder) => SnagMapData {
    const textList: Phaser.GameObjects.BitmapText[] = [];
    Object.entries(skillList).forEach(([name, func], index) => {
        textList.push(scene.add.bitmapText(300 + index * 100, 50, "childCircle", name));
        return;
    });
    return skillList.wall;
}
