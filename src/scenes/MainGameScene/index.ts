import Phaser from "phaser";
import { score } from "../../events/updateScore";
import { t } from "../../GameObject/data";
import { ArenaBorder, createBorder } from "./createBorder";
import { createMarble } from "./createMarble";
import { createSnag, refreshSnag, SnagMapData } from "./createSnag";

export default class MainGameScene extends Phaser.Scene {
    private scoreText!: Phaser.GameObjects.BitmapText;
    private marble!: Phaser.Physics.Matter.Sprite;
    private arenaBorder!: ArenaBorder;
    private snagMapData!: SnagMapData;
    private round = 1;
    private startTime = 0;
    public constructor() {
        super("mainGame");
    }

    public create(): void {
        const arenaSize = {
            width: 900,
            height: 500
        };
        this.arenaBorder = createBorder(this, arenaSize);
        this.snagMapData = createSnag(this, this.arenaBorder);
        this.marble = createMarble(this, this.snagMapData);

        this.scoreText = this.add.bitmapText(50, 150, "childCircle", "");
        this.scoreText.setText([]);
    }

    public update(time: number, delta: number): void {
        this.snagMapData.update?.(time, delta);
        if (!this.startTime) this.startTime = this.game.getTime();
        this.scoreText.setText([
            `分数: ${score}`,
            `球速: ${new Phaser.Math.Vector2(this.marble.body.velocity).length().toFixed(0)}`,
            `弹珠类型: ${t.type(this.marble).split(":")[1]}`,
            `回合: ${this.round}`,
            `fps: ${(this.game.getFrame() / ((this.game.getTime() - this.startTime) / 1000)).toFixed(0)}`
        ]);
        if (this.marble.y > this.arenaBorder.bottom) {
            this.round += 1;
            refreshSnag(this.snagMapData);
            this.marble = createMarble(this, this.snagMapData);
        }
    }
}
