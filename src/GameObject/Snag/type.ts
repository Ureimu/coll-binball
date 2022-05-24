import { Bomb } from "./bomb";
import { NormalSnag } from "./normalSnag";
import { Wall } from "./wall";

export type SnagKind = NormalSnag | Bomb | Wall;
export type SnagType = SnagKind["type"];

export type SpecSnagKind<T extends SnagType> = T extends NormalSnag["type"]
    ? NormalSnag
    : T extends Bomb["type"]
    ? Bomb
    : T extends Wall["type"]
    ? Wall
    : never;
