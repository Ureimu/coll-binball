import { Rectangle } from "./rectangle";

export type BackWallKind = Rectangle;
export type BackWallType = BackWallKind["type"];

export type SpecBackWallKind<T extends BackWallType> = T extends Rectangle["type"] ? Rectangle : never;
