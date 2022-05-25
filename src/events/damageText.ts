const time = 1000;
const tick = 50 / 3;
const yVary = 0.5;
export function damageText(scene: Phaser.Scene, damage: number, x: number, y: number): void {
    const text = scene.add.bitmapText(x, y, "childCircle", `${damage}`);
    let yPlus = 0;
    let index = 0;

    const a = setInterval(() => {
        yPlus -= yVary;
        index += 1;
        const xa = (index * tick) / time;
        text.setPosition(x, y + yPlus);
        text.setAlpha(1 - xa ** 0.8);
    }, tick);
    setTimeout(() => {
        text.destroy();
        clearInterval(a);
    }, time);
}
