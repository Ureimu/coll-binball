import Phaser from "phaser";
import { refreshSnag } from "../../../events/refreshSnag";
import { score } from "../../../events/updateScore";
import { t } from "../../../GameObject/data";
import { snagPairManager } from "../../../GameObject/Snag";
import { ArenaBorder, createBorder } from "./createBorder";
import { createMarble } from "./createMarble";
import { createSnag } from "./createSnag";
import { SnagMapData } from "../../../snagMap/type";
import { createUI } from "./createUI";

export default class MainGameScene extends Phaser.Scene {
    private scoreText!: Phaser.GameObjects.BitmapText;
    private marble!: Phaser.Physics.Matter.Sprite;
    private arenaBorder!: ArenaBorder;
    private snagMapData!: SnagMapData;
    private round = 1;
    private startTime = 0;
    private tick = 0;
    public constructor() {
        super("mainGame");
    }

    public create(): void {
        const arenaSize = {
            width: 900,
            height: 500
        };
        snagPairManager.clear();
        this.arenaBorder = createBorder(this, arenaSize);
        const snagMapFunc = createUI(this, this.arenaBorder);
        this.snagMapData = createSnag(this, this.arenaBorder, snagMapFunc);
        this.marble = createMarble(this, this.snagMapData);

        this.scoreText = this.add.bitmapText(50, 50, "childCircle", "");
        this.scoreText.setText([]).setDepth(100);
    }

    public update(time: number, delta: number): void {
        this.tick += 1;
        this.snagMapData.update?.({ tick: this.tick, time, delta });
        snagPairManager.sync();
        if (!this.startTime) this.startTime = this.game.getTime();
        this.scoreText.setText([
            `分数: ${score}`,
            `球速: ${new Phaser.Math.Vector2(this.marble.body.velocity).length().toFixed(0)}`,
            `弹珠类型: ${t.type(this.marble).split(":")[1]}`,
            `回合: ${this.round}`,
            `fps: ${(this.game.getFrame() / ((this.game.getTime() - this.startTime) / 1000)).toFixed(0)}`,
            `time: ${time.toFixed(0)}`,
            `objNum: ${this.matter.systems.updateList.length}`,
            `displayObjNum: ${this.scene.systems.displayList.length}`
        ]);
        if (this.marble.y > this.arenaBorder.bottom) {
            this.round += 1;
            if (this.scene.isActive()) {
                refreshSnag(this.snagMapData);
            }
            this.marble.destroy();
            this.marble = createMarble(this, this.snagMapData);
        }
    }
}
