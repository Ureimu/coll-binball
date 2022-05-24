import Phaser from "phaser";
import { score } from "../../events/updateScore";
import { ArenaBorder, createBorder } from "./createBorder";
import { createMarble } from "./createMarble";
import { createSnag, SnagMapData } from "./createSnag";

export default class MainGameScene extends Phaser.Scene {
    private scoreText!: Phaser.GameObjects.Text;
    private marble!: Phaser.Physics.Matter.Sprite;
    private arenaBorder!: ArenaBorder;
    private snagMapData!: SnagMapData;
    private round = 1;
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

        this.scoreText = this.add.text(50, 150, "", { font: "30px Courier" });
        this.scoreText.setText([]);
    }

    public update(): void {
        this.scoreText.setText([
            `score: ${score}`,
            `marble speed: ${new Phaser.Math.Vector2(this.marble.body.velocity).length().toFixed(0)}`,
            `round: ${this.round}`
        ]);
        if (this.marble.y > this.arenaBorder.bottom) {
            this.round += 1;
            this.marble = createMarble(this, this.snagMapData);
        }
    }
}
