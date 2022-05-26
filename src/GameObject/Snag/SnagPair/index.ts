import { snagCreatorList } from "..";
import { t } from "../../data";
import { snagSubSnag } from "../subSnag";
import { SnagType } from "../type";

export class SnagPair {
    public subSnag: Phaser.Physics.Matter.Sprite;
    public mainSnagType: SnagType;
    public managerUpdateMainSnag: "no" | "destroy" | "recreate" = "no";
    private isExistMainSnag = false;
    public get existMainSnag() {
        return this.isExistMainSnag;
    }
    public constructor(public mainSnag: Phaser.Physics.Matter.Sprite) {
        this.subSnag = snagSubSnag(this.mainSnag.scene, this.mainSnag.x, this.mainSnag.y);
        this.mainSnagType = t.type(this.mainSnag) as SnagType;
        this.isExistMainSnag = true;
    }

    public destroyMainSnag(): void {
        const mainSnagData = t.getData(this.mainSnag, this.mainSnagType);
        t.setData(this.subSnag, mainSnagData);
        this.mainSnag.destroy();
        if (this.managerUpdateMainSnag === "no") {
            this.managerUpdateMainSnag = "destroy";
        }
        this.isExistMainSnag = false;
    }

    public recreateMainSnag(): Phaser.Physics.Matter.Sprite {
        const reMainSnag = snagCreatorList[this.mainSnagType](this.subSnag.scene, this.subSnag.x, this.subSnag.y);
        t.setData(reMainSnag, t.getData(this.subSnag, this.mainSnagType));
        this.mainSnag = reMainSnag;
        this.syncSnag();
        if (this.managerUpdateMainSnag === "no") {
            this.managerUpdateMainSnag = "recreate";
        }
        this.isExistMainSnag = true;
        return reMainSnag;
    }

    private syncSnag(): void {
        this.mainSnag.setVelocity(this.subSnag.body.velocity.x, this.subSnag.body.velocity.y);
    }
}
