/* eslint-disable @typescript-eslint/no-namespace */
import { GameObjectKind, GameObjectType, SpecDataByType } from "./type";
type ObjType = Phaser.GameObjects.GameObject;
const objDataMap = new Map<ObjType, GameObjectKind>();
const objTypeMap = new Map<ObjType, GameObjectType>();
const subSnagMap = new Map<ObjType, ObjType>();

export class t {
    public static type(obj: ObjType): GameObjectType | "unknown" {
        return objTypeMap.get(obj) ?? "unknown";
    }

    public static recordType(obj: ObjType, type: GameObjectType): void {
        objTypeMap.set(obj, type);
    }

    public static getData<T extends GameObjectType>(obj: ObjType, type: T): SpecDataByType<T> {
        return objDataMap.get(obj) as SpecDataByType<T>;
    }

    public static setData<T extends GameObjectType>(obj: ObjType, data: SpecDataByType<T>): void {
        objDataMap.set(obj, data);
    }

    public static getSubSnag(obj: ObjType): ObjType | undefined {
        return subSnagMap.get(obj);
    }

    public static setSubSnag(obj: ObjType, subSnag: ObjType): void {
        subSnagMap.set(obj, subSnag);
    }
}
