/* eslint-disable @typescript-eslint/no-namespace */
import { NullCategory } from ".";
import { MarbleCategory } from "./Marble";
import { MarbleType, MarbleKind, SpecMarbleKind } from "./Marble/type";
import { SnagCategory } from "./Snag";
import { SubSnagCategory } from "./Snag/subSnag";
import { SnagKind, SnagType, SpecSnagKind } from "./Snag/type";
import { SnagWallCategory } from "./Snag/wall";

export type GameObjectType = MarbleType | SnagType | "unknown";
export type GameObjectKind = MarbleKind | SnagKind;

export type SpecDataByType<T extends GameObjectType> = T extends MarbleType
    ? SpecMarbleKind<T>
    : T extends SnagType
    ? SpecSnagKind<T>
    : never;

export const Categories = {
    NullCategory,
    SnagCategory,
    SnagWallCategory,
    SubSnagCategory,
    MarbleCategory
};
