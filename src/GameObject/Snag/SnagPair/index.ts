import { snagCreatorList } from "..";
import { t } from "../../data";
import { SpecDataByType } from "../../type";
import { snagSubSnag, SubSnag } from "../subSnag";
import { SnagType, SpecSnagKind } from "../type";

type SubSnagObjType = Phaser.Physics.Matter.Sprite;
type MainSnagObjType = Phaser.Physics.Matter.Sprite;
export class SnagPair<MainSnagType extends SnagType> {
    public subSnag: SubSnagObjType;
    public mainSnagType: MainSnagType;
    public subSnagType: SubSnag["type"] = "snag:subSnag";
    public managerUpdateMainSnag: "no" | "destroy" | "recreate" = "no";
    private isExistMainSnag = false;
    public get existMainSnag() {
        return this.isExistMainSnag;
    }
    public constructor(public mainSnag: MainSnagObjType) {
        this.subSnag = snagSubSnag(this.mainSnag.scene, this.mainSnag.x, this.mainSnag.y);
        this.mainSnagType = t.type(this.mainSnag) as MainSnagType;
        this.isExistMainSnag = true;
    }

    public destroyMainSnag(delay = 100): void {
        const mainData = this.data("main");
        if (!mainData.liveData.snagDestroyTimeOut) {
            this.mainSnag.setAlpha(0.5);
            mainData.liveData.snagDestroyTimeOut = setTimeout(this.destroyFunc, delay);
        }
    }
    private destroyFunc = () => {
        // 重置一些预设数据
        const mainSnagData = this.data("main");
        mainSnagData.liveData = { collidedNum: 0, isCriticallyStrikeSnag: false, isRefreshSnag: false, elasticity: 1 };
        t.setData(this.subSnag, mainSnagData as SpecDataByType<MainSnagType>);
        this.mainSnag.destroy();
        if (this.managerUpdateMainSnag === "no") {
            this.managerUpdateMainSnag = "destroy";
        }
        this.isExistMainSnag = false;
        this.subSnag.setVisible(true);
    };

    public cancel(type: "destroy"): void {
        if (type === "destroy") {
            clearTimeout(this.data("main").liveData.snagDestroyTimeOut);
            this.mainSnag.setAlpha(1);
        }
    }

    public recreateMainSnag(): MainSnagObjType {
        const reMainSnag = snagCreatorList[this.mainSnagType](this.subSnag.scene, this.subSnag.x, this.subSnag.y);
        this.setData(reMainSnag, this.data("main"));
        this.mainSnag = reMainSnag;
        this.syncSnag();
        if (this.managerUpdateMainSnag === "no") {
            this.managerUpdateMainSnag = "recreate";
        }
        this.isExistMainSnag = true;
        this.subSnag.setVisible(false);
        return reMainSnag;
    }

    public setSnags(func: (sprite: MainSnagObjType | SubSnagObjType) => void) {
        [this.mainSnag, this.subSnag].filter(i => i.body).forEach(func);
    }

    private syncSnag(): void {
        this.mainSnag.setVelocity(this.subSnag.body.velocity.x, this.subSnag.body.velocity.y);
    }

    public data(type: "main"): SpecSnagKind<MainSnagType>;
    public data(type: "sub"): SpecSnagKind<typeof this["subSnagType"]>;
    public data(type: "main" | "sub"): SpecSnagKind<MainSnagType> | SpecSnagKind<typeof this["subSnagType"]> {
        if (type === "main") {
            if (this.existMainSnag) {
                return t.getData(this.mainSnag, this.mainSnagType) as SpecSnagKind<MainSnagType>;
            } else {
                return t.getData(this.subSnag, this.mainSnagType) as SpecSnagKind<MainSnagType>;
            }
        } else if (type === "sub") {
            return t.getData(this.subSnag, this.subSnagType) as SpecSnagKind<typeof this["subSnagType"]>;
        } else {
            throw new Error(`unexpected end point`);
        }
    }

    private setData(obj: SubSnagObjType, data: SpecSnagKind<MainSnagType> | SpecSnagKind<typeof this["subSnagType"]>) {
        t.setData(obj, data);
    }
}
