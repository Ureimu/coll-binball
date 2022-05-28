/* eslint-disable @typescript-eslint/no-namespace */
import { GameObjectKind, GameObjectType, SpecDataByType } from "./type";
type ObjType = Phaser.GameObjects.GameObject;
const objDataMap = new Map<ObjType, Map<GameObjectType, GameObjectKind>>();
const objTypeMap = new Map<ObjType, GameObjectType>();

export class t {
    public static type(obj: ObjType): GameObjectType | "unknown" {
        return objTypeMap.get(obj) ?? "unknown";
    }

    public static recordType(obj: ObjType, type: GameObjectType): void {
        objTypeMap.set(obj, type);
    }

    public static getData<T extends GameObjectType>(obj: ObjType, type: T): SpecDataByType<T> {
        return objDataMap.get(obj)?.get(type) as SpecDataByType<T>;
    }

    public static setData<T extends GameObjectType>(obj: ObjType, data: SpecDataByType<T>): void {
        if (!objDataMap.has(obj)) {
            objDataMap.set(obj, new Map());
        }
        objDataMap.get(obj)?.set(data.type, data);
    }
}
