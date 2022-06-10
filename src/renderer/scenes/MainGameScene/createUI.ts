import { skillList } from "../../../snagMap/skill";
import { SnagMapData } from "../../../snagMap/type";
import { ArenaBorder } from "./createBorder";
let mapNow: keyof typeof skillList = "wall";
export function createUI(
    scene: Phaser.Scene,
    border: ArenaBorder
): (sceneH: Phaser.Scene, borderH: ArenaBorder) => SnagMapData {
    const textList: Phaser.GameObjects.BitmapText[] = [];
    Object.entries(skillList).forEach(([name, func], index) => {
        textList.push(scene.add.bitmapText(300 + index * 100, 50, "childCircle", name));
        return;
    });
    //  If a Game Object is clicked on, this event is fired.
    //  We can use it to emit the 'clicked' event on the game object itself.
    scene.input.on(
        "gameobjectup",
        function (_pointer: any, gameObject: Phaser.GameObjects.GameObject) {
            gameObject.emit("clicked", gameObject);
        },
        scene
    );
    textList.forEach(text => {
        text.setInteractive();
        text.on("clicked", () => {
            mapNow = text.text as keyof typeof skillList;
            console.log(mapNow);
            scene.scene.restart();
        });
        return;
    });
    return skillList[mapNow];
}
