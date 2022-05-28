/* eslint-disable @typescript-eslint/no-namespace */
import { BackWallKind, BackWallType, SpecBackWallKind } from "./BackWall/type";
import { categoryManager } from "./categoryManager";
import { MarbleType, MarbleKind, SpecMarbleKind } from "./Marble/type";
import { SnagKind, SnagType, SpecSnagKind } from "./Snag/type";

export type GameObjectType = MarbleType | SnagType | BackWallType | "unknown";
export type GameObjectKind = MarbleKind | SnagKind | BackWallKind;

export type SpecDataByType<T extends GameObjectType> = T extends MarbleType
    ? SpecMarbleKind<T>
    : T extends SnagType
    ? SpecSnagKind<T>
    : T extends BackWallType
    ? SpecBackWallKind<T>
    : never;

export const NullCategory = 2 ** 31;
export const BackWallCategory = 2 ** 3;
export const MarbleCategory = 2 ** 2;
export const SnagCategory = 2 ** 0;
export const SubSnagCategory = 2 ** 30;
export const SnagWallCategory = 2 ** 1;
export const Categories = {
    NullCategory,
    SnagCategory,
    SnagWallCategory,
    SubSnagCategory,
    MarbleCategory,
    BackWallCategory
};
// checkCategoryIsUnique
Object.entries(Categories).forEach(([type, num]) => categoryManager.setCategory(type, num));
