import { tap } from "ramda";

const logX = (x: any) => console.log("x is " + x);
export const tapX = tap(logX);
