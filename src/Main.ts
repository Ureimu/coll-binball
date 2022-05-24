import Phaser from "phaser";

import PreloaderScene from "./scenes/PreloaderScene";
import MainGameScene from "./scenes/MainGameScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth - 40,
    height: window.innerHeight - 20,
    physics: {
        default: "matter",
        matter: {
            enableSleeping: false,
            debug: {
                showBody: true,
                showStaticBody: true,
                showVelocity: true,
                showBounds: true
            }
        }
    },

    scene: [PreloaderScene, MainGameScene],
    backgroundColor: "#21213B"
};
export const windowGameSize = {
    width: window.innerWidth - 40,
    height: window.innerHeight - 20
};
console.log(window.innerWidth, window.innerHeight);
export default new Phaser.Game(config);
