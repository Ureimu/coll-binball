import Phaser from "phaser";

import PreloaderScene from "./scenes/PreloaderScene";
import MainGameScene from "./scenes/MainGameScene";
export const windowGameSize = {
    width: 1440,
    height: 900
};
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoRound: true,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: windowGameSize.width,
        height: windowGameSize.height
    },
    physics: {
        default: "matter",
        matter: {
            enableSleeping: false,
            debug: {
                showBody: false,
                showStaticBody: false,
                showVelocity: false,
                showCollisions: false
            }
        }
    },
    scene: [PreloaderScene, MainGameScene],
    backgroundColor: "#56566D"
};

console.log(window.innerWidth, window.innerHeight);
export default new Phaser.Game(config);
