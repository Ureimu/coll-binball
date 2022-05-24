export const shootMarbleFunc = (
    marble: Phaser.Physics.Matter.Sprite,
    graphicsLineForSight: Phaser.GameObjects.Graphics,
    drawLineForSight: (po: Phaser.Input.Pointer) => void,
    scene: Phaser.Scene,
    p: Phaser.Input.InputPlugin
) => {
    return (pointer: Phaser.Input.Pointer) => {
        if (marble.getData("readyToShoot")) {
            marble.setData("readyToShoot", false);
            marble.setBounce(1);
            marble.setIgnoreGravity(false);
            console.log("setIgnoreGravity to false");
            const baseVelocity = 0.0002;
            const achoPos = new Phaser.Math.Vector2(marble);
            const pointerPos = new Phaser.Math.Vector2(pointer);
            const curve = new Phaser.Curves.Line(achoPos, pointerPos);
            const angle = curve.getTangent(0).angle();
            const force = new Phaser.Math.Vector2(baseVelocity * Math.cos(angle), baseVelocity * Math.sin(angle));
            marble.applyForce(force);
            console.log(angle, baseVelocity * Math.cos(angle), baseVelocity * Math.sin(angle));
            graphicsLineForSight.clear();
            p.off("pointermove", drawLineForSight, scene);
        }
    };
};
