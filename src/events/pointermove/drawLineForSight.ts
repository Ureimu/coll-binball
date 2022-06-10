export const drawLineForSightFunc = (
    marble: Phaser.Physics.Matter.Sprite,
    graphicsLineForSight: Phaser.GameObjects.Graphics
) => {
    return (pointer: Phaser.Input.Pointer) => {
        //  Keep the paddle within the game
        const achoPos = marble.body.position as Phaser.Math.Vector2;
        const pointerPos = new Phaser.Math.Vector2(pointer);
        const curve = new Phaser.Curves.Line(achoPos, pointerPos);
        graphicsLineForSight.clear();
        marble.setAngle((curve.getTangent(0).angle() * 180) / Math.PI);
        curve.draw(graphicsLineForSight);
    };
};
