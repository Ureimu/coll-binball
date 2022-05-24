import { Knife } from "./knife";
import { Stone } from "./stone";

export type MarbleKind = Stone | Knife;
export type MarbleType = MarbleKind["type"];

export type SpecMarbleKind<T extends MarbleType> = T extends Stone["type"]
    ? Stone
    : T extends Knife["type"]
    ? Knife
    : never;
