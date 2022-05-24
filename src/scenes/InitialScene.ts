import Phaser from "phaser";
import { hitSnagFunc } from "../events/onCollide/hitSnag";
import { score } from "../events/updateScore";

export default class InitialScene extends Phaser.Scene {
    private achoThePup!: Phaser.Physics.Matter.Sprite;
    private scoreText!: Phaser.GameObjects.Text;
    public constructor() {
        super("initial");
    }

    public create(): void {
        this.add.image(400, 570, "ground").setScale(4);
        const graphicsLineForSight = this.add.graphics();
        graphicsLineForSight.lineStyle(2, 0x00ff00, 1.0);
        this.achoThePup = this.matter.add.sprite(100, 100, "acho");
        this.achoThePup.setScale(0.1, 0.1);
        this.achoThePup.setCircle(10);
        this.achoThePup.setIgnoreGravity(true);
        this.achoThePup.setInteractive();
        this.achoThePup.setDataEnabled();
        this.achoThePup.setData("readyToShoot", true);
        const bricksList: Phaser.Physics.Matter.Sprite[] = [];
        //  Create the bricks
        for (let i = 0; i < 100; i++) {
            const brick = this.matter.add
                .sprite(Phaser.Math.Between(0, 2000), Phaser.Math.Between(0, 800), "acho")
                .setScale(0.5, 0.5);
            brick.setCircle(30);
            brick.setIgnoreGravity(true);
            brick.setScale(0.3, 0.3);
            brick.setStatic(false);
            brick.setBounce(1);
            bricksList.push(brick);
        }

        const hitBrickEvent = hitSnagFunc(this, this.achoThePup, bricksList);
        this.achoThePup.setOnCollideEnd(hitBrickEvent);

        this.matter.setCollisionGroup([this.achoThePup], 1);
        this.matter.world.setGravity(0, 1, 0.001);
        this.matter.world.setBounds(0, 0, window.innerWidth - 40, window.innerHeight - 20);

        //  Input events
        const drawLineForSight = (pointer: Phaser.Input.Pointer) => {
            //  Keep the paddle within the game
            const achoPos = this.achoThePup.body.position as Phaser.Math.Vector2;
            const pointerPos = new Phaser.Math.Vector2(pointer);
            const curve = new Phaser.Curves.Line(achoPos, pointerPos);
            graphicsLineForSight.clear();
            curve.draw(graphicsLineForSight);
        };
        const p = this.input.on("pointermove", drawLineForSight, this);

        this.input.on(
            "pointerup",
            (pointer: Phaser.Input.Pointer) => {
                if (this.achoThePup.getData("readyToShoot")) {
                    this.achoThePup.setData("readyToShoot", false);
                    this.achoThePup.setBounce(1);
                    this.achoThePup.setIgnoreGravity(false);
                    console.log("setIgnoreGravity to false");
                    const baseVelocity = 0.007;
                    const achoPos = new Phaser.Math.Vector2(this.achoThePup);
                    const pointerPos = new Phaser.Math.Vector2(pointer);
                    const curve = new Phaser.Curves.Line(achoPos, pointerPos);
                    const angle = curve.getTangent(0).angle();
                    const force = new Phaser.Math.Vector2(
                        baseVelocity * Math.cos(angle),
                        baseVelocity * Math.sin(angle)
                    );
                    this.achoThePup.applyForce(force);
                    console.log(angle, baseVelocity * Math.cos(angle), baseVelocity * Math.sin(angle));
                    graphicsLineForSight.clear();
                    p.off("pointermove", drawLineForSight, this);
                }
            },
            this
        );

        this.scoreText = this.add.text(150, 150, "", { font: "30px Courier" });
        this.scoreText.setText([]);
    }

    public update(time: number, delta: number): void {
        this.scoreText.setText([
            `${score}`,
            `${new Phaser.Math.Vector2(this.achoThePup.body.velocity).length().toFixed(0)}`
        ]);
    }
}
