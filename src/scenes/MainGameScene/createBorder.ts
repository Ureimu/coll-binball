import { snagWall } from "../../GameObject/Snag/wall";
import { windowGameSize } from "../../Main";
export interface ArenaBorder {
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
}
export function createBorder(scene: Phaser.Scene, opts: { width: number; height: number }): ArenaBorder {
    const { width: arenaWidth, height: arenaHeight } = opts;
    const picWidth = 80;
    const picHeight = 800;

    const leftWall = snagWall(
        scene,
        windowGameSize.width / 2 - arenaWidth / 2 - picWidth / 2,
        windowGameSize.height - arenaHeight / 2
    );
    leftWall.setStatic(true);
    leftWall.setRotation(Math.PI / 2);
    leftWall.flipX = true;

    const rightWall = snagWall(
        scene,
        windowGameSize.width / 2 + arenaWidth / 2 + picWidth / 2,
        windowGameSize.height - arenaHeight / 2
    );
    rightWall.setStatic(true);
    rightWall.setRotation(Math.PI / 2);
    leftWall.flipX = true;
    rightWall.flipY = true;

    const topWall = snagWall(scene, windowGameSize.width / 2, rightWall.getBounds().top - 40).setScale(
        (arenaWidth + 2 * picWidth) / picHeight,
        1
    );
    topWall.setStatic(true);

    return {
        ...opts,
        top: topWall.getBounds().bottom,
        bottom: windowGameSize.height,
        left: leftWall.getBounds().right,
        right: rightWall.getBounds().left
    };
}
