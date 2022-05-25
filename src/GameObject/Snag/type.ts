import { Bomb } from "./bomb";
import { NormalSnag } from "./normalSnag";
import { SubSnag } from "./subSnag";
import { Wall } from "./wall";

export type SnagKind = NormalSnag | Bomb | Wall | SubSnag;
export type SnagType = SnagKind["type"];

export type SpecSnagKind<T extends SnagType> = T extends NormalSnag["type"]
    ? NormalSnag
    : T extends Bomb["type"]
    ? Bomb
    : T extends Wall["type"]
    ? Wall
    : T extends SubSnag["type"]
    ? SubSnag
    : never;
