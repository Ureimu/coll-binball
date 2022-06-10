import Phaser from "phaser";
import ground from "@assets/ground.png";
import marbleKnife from "@assets/marble-knife.png";
import childCircleFnt from "@assets/fonts/childCircle/childCircle.fnt";
import childCircle from "@assets/fonts/childCircle/childCircle_0.png";
import marbleStone from "@assets/marble-stone.png";
import normalSnag from "@assets/normalSnag.png";
export default class Preloader extends Phaser.Scene {
    public constructor() {
        super("preloader");
    }

    public preload(): void {
        this.load.bitmapFont("childCircle", childCircle, childCircleFnt);
        this.load.image("ground", ground);
        this.load.image("normalSnag", normalSnag);
        this.load.image("marble-stone", marbleStone);
        this.load.image("marble-knife", marbleKnife);
        this.scale.autoCenter = 2;
    }

    public create(): void {
        this.scene.start("mainGame");
    }
}
