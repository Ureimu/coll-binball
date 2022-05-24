/* eslint-disable @typescript-eslint/no-namespace */
import { GameObjectType, SpecDataByType } from "./type";
type ObjType = Phaser.GameObjects.GameObject;
export class t {
    public static type(obj: ObjType): GameObjectType | "unknown" {
        return obj.getData("type") as GameObjectType | "unknown";
    }

    public static recordType(obj: ObjType, type: GameObjectType): void {
        obj.setData("type", type);
    }

    public static getTypedData<T extends GameObjectType>(obj: ObjType, type: T): SpecDataByType<T> {
        return obj.getData(type) as SpecDataByType<T>;
    }

    public static setTypedData<T extends GameObjectType>(obj: ObjType, data: SpecDataByType<T>): void {
        obj.setData(data.type, data);
    }
}
