import { SnagPair } from ".";
import { SnagType } from "../type";

type ObjType = Phaser.Physics.Matter.Sprite;
export class SnagPairManager {
    public snagMapM2S: Map<ObjType, ObjType> = new Map<ObjType, ObjType>();
    public snagMapS2M: Map<ObjType, ObjType> = new Map<ObjType, ObjType>();
    public mainSnagPairMap: Map<ObjType, SnagPair<SnagType>> = new Map<ObjType, SnagPair<SnagType>>();
    public subSnagPairMap: Map<ObjType, SnagPair<SnagType>> = new Map<ObjType, SnagPair<SnagType>>();
    public constructor(private pairList: SnagPair<SnagType>[] = []) {}
    public clear(): void {
        this.pairList = [];
        this.snagMapS2M.clear();
        this.snagMapM2S.clear();
        this.mainSnagPairMap.clear();
        this.subSnagPairMap.clear();
    }
    public add(pair: SnagPair<SnagType>) {
        this.pairList.push(pair);
        this.snagMapS2M.set(pair.subSnag, pair.mainSnag);
        this.snagMapM2S.set(pair.mainSnag, pair.subSnag);
        this.mainSnagPairMap.set(pair.mainSnag, pair);
        this.subSnagPairMap.set(pair.subSnag, pair);
    }
    public sync(): void {
        this.pairList.forEach(pair => {
            if (pair.managerUpdateMainSnag === "destroy") {
                this.snagMapS2M.delete(pair.subSnag);
                this.snagMapM2S.delete(pair.mainSnag);
                this.mainSnagPairMap.delete(pair.mainSnag);
                this.subSnagPairMap.delete(pair.subSnag);
                pair.managerUpdateMainSnag = "no";
            }
            if (pair.managerUpdateMainSnag === "recreate") {
                this.snagMapS2M.set(pair.subSnag, pair.mainSnag);
                this.snagMapM2S.set(pair.mainSnag, pair.subSnag);
                this.mainSnagPairMap.set(pair.mainSnag, pair);
                this.subSnagPairMap.set(pair.subSnag, pair);
                pair.managerUpdateMainSnag = "no";
            }
            if (!pair.existMainSnag) {
                return;
            }
            if (
                pair.mainSnag.body.position.x !== pair.subSnag.body.position.x ||
                pair.mainSnag.body.position.y !== pair.subSnag.body.position.y
            ) {
                pair.mainSnag.setPosition(pair.subSnag.body.position.x, pair.subSnag.body.position.y);
            }

            if (
                pair.mainSnag.body.velocity.x !== pair.subSnag.body.velocity.x ||
                pair.mainSnag.body.velocity.y !== pair.subSnag.body.velocity.y
            ) {
                pair.mainSnag.setVelocity(pair.subSnag.body.velocity.x, pair.subSnag.body.velocity.y);
            }
        });
    }
    public getByMain(mainSnag: ObjType): SnagPair<SnagType> | undefined {
        return this.mainSnagPairMap.get(mainSnag);
    }
    public getBySub(subSnag: ObjType): SnagPair<SnagType> | undefined {
        return this.subSnagPairMap.get(subSnag);
    }
}
