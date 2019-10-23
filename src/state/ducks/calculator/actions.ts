import { createStandardAction } from "typesafe-actions";

export const changeWeapon = createStandardAction("@@calculator/CHANGE_WEAPON")<
  number
>();

export const changeSocket = createStandardAction("@@calculator/CHANGE_SOCKET")<{
  index: number;
  plugItemHash: number;
}>();

export const changeSockets = createStandardAction(
  "@@calculator/CHANGE_SOCKETS"
)<number[]>();
