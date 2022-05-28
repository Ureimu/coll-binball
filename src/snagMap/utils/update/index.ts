import { NormalSnagData } from "../../../GameObject/Snag/normalSnag";
import { SnagPair } from "../../../GameObject/Snag/SnagPair";
import { SnagType } from "../../../GameObject/Snag/type";
import { ArenaBorder } from "../../../scenes/MainGameScene/createBorder";
import { SnagMapUpdateParas } from "../../type";

export class UpdateLogic<T extends SnagType> {
    public constructor(public snagPairList: SnagPair<T>[], public border: ArenaBorder) {}
    /**
     * 上下穿越，左右穿越 。
     *
     * @memberof UpdateLogic
     */
    public mirrorShuttle(topAndBottom = true, leftAndRight = true): void {
        if (!topAndBottom && !leftAndRight) return;

        const genePos = {
            top: this.border.top - NormalSnagData.radius,
            bottom: this.border.bottom + NormalSnagData.radius,
            left: this.border.left - NormalSnagData.radius,
            right: this.border.right + NormalSnagData.radius
        };
        const fullHeightLength = genePos.bottom - genePos.top;
        const fullWidthLength = genePos.right - genePos.left;
        this.snagPairList
            .map(i => [i.subSnag, i.subSnag.body.position] as const)
            .forEach(([snag, pos]) => {
                if (topAndBottom) {
                    if (pos.y - NormalSnagData.radius > this.border.bottom) {
                        const exceedLength = pos.y - genePos.bottom;
                        snag.setPosition(snag.x, genePos.top + (exceedLength % fullHeightLength));
                    } else if (pos.y + NormalSnagData.radius < this.border.top) {
                        const exceedLength = genePos.top - pos.y;
                        snag.setPosition(snag.x, genePos.bottom - (exceedLength % fullHeightLength));
                    }
                }
                if (leftAndRight) {
                    if (pos.x - NormalSnagData.radius > this.border.right) {
                        const exceedLength = pos.x - genePos.right;
                        snag.setPosition(genePos.left + (exceedLength % fullWidthLength), snag.y);
                    } else if (pos.x + NormalSnagData.radius < this.border.left) {
                        const exceedLength = genePos.left - pos.x;
                        snag.setPosition(genePos.right - (exceedLength % fullWidthLength), snag.y);
                    }
                }
            });
    }

    public curveMove(posFunc: (pair: SnagPair<T>, index: number) => { x: number; y: number }) {
        this.snagPairList.forEach((pair, index) => {
            const nextPos = posFunc(pair, index);
            pair.subSnag.setPosition(nextPos.x, nextPos.y);
        });
    }
}
