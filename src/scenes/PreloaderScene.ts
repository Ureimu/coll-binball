import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
    public constructor() {
        super("preloader");
    }

    public preload(): void {
        this.load.bitmapFont(
            "childCircle",
            "assets/fonts/childCircle/childCircle_0.png",
            "assets/fonts/childCircle/childCircle.fnt"
        );
        this.load.image("acho", "assets/acho.png");
        this.load.image("ground", "assets/ground.png");
        this.scale.autoCenter = 2;
        this.scale.setMaxZoom();
    }

    public create(): void {
        this.scene.start("mainGame");
    }
}
