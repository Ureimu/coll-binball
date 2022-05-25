import { t } from "../GameObject/data";
import { MarbleType, SpecMarbleKind } from "../GameObject/Marble/type";
import { SnagKind, SnagType, SpecSnagKind } from "../GameObject/Snag/type";

export let score = 0;
const scoreHandler: { [T in MarbleType]: (data: SpecMarbleKind<T>, snagData: SnagKind) => number } = {
    "marble:stone": (data, snagData) => {
        return calcBaseDamage(data, snagData);
    },
    "marble:knife": (data, snagData) => {
        return calcBaseDamage(data, snagData);
    }
};
export function updateScore<T extends MarbleType, U extends SnagType>(
    marbleType: T,
    marble: Phaser.GameObjects.GameObject,
    snagType: U,
    snag: Phaser.GameObjects.GameObject
): number {
    const marbleData = t.getData(marble, marbleType) as SpecMarbleKind<T>;
    const snagData = t.getData(snag, snagType) as SpecSnagKind<U>;
    const addedScore = scoreHandler[marbleType](marbleData, snagData);
    score += addedScore;
    return addedScore;
}
function calcBaseDamage<T extends MarbleType>(marbleData: SpecMarbleKind<T>, snagData: SnagKind): number {
    let totalDamage = 0;
    if (marbleData.criticallyStrike) {
        totalDamage += marbleData.csDamage;
    } else {
        totalDamage += marbleData.damage;
    }
    totalDamage += snagData.scoreBonus;
    return totalDamage;
}
