/* eslint-disable @typescript-eslint/no-namespace */
import { MarbleType, MarbleKind, SpecMarbleKind } from "./Marble/type";
import { SnagKind, SnagType, SpecSnagKind } from "./Snag/type";

export type GameObjectType = MarbleType | SnagType | "unknown";
export type GameObjectKind = MarbleKind | SnagKind;

export type SpecDataByType<T extends GameObjectType> = T extends MarbleType
    ? SpecMarbleKind<T>
    : T extends SnagType
    ? SpecSnagKind<T>
    : never;
