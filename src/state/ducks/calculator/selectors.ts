import { IApplicationState } from "..";
import { createSelector } from "reselect";
import { getInventoryItemsByHash } from "../manifest/selectors";
import { IInventoryItem } from "../manifest/types";

export const getSelectedInventoryItemHash = (state: IApplicationState) =>
  state.calculator.itemHash;

export const getSelectedInventoryItem = createSelector(
  getInventoryItemsByHash,
  getSelectedInventoryItemHash,
  (inventoryItemsByHash, itemHash): IInventoryItem | undefined =>
    inventoryItemsByHash.get(itemHash)
);

export const getSelectedPlugItemHashes = (state: IApplicationState) =>
  state.calculator.plugItemHashes;

export const getSelectedPlugItems = createSelector(
  getInventoryItemsByHash,
  getSelectedPlugItemHashes,
  (inventoryItemsByHash, plugItemHashes): (IInventoryItem | undefined)[] =>
    plugItemHashes.map(plugItemHash => inventoryItemsByHash.get(plugItemHash))
);
