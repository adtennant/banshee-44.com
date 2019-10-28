import { createSelector } from "reselect";
import {
  IInventoryItem,
  IInventoryItemRaw,
  ISocketCategoryRaw,
  IPlugSetRaw,
  IStatRaw,
  IStatGroupRaw
} from "./types";
import { IApplicationState } from "..";

export const getInventoryItemsRaw = (state: IApplicationState) =>
  state.manifest.inventoryItem;

export const getInventoryItemsByHashRaw = createSelector(
  getInventoryItemsRaw,
  (inventoryItems): Record<number, IInventoryItemRaw> =>
    inventoryItems.reduce(
      (result, item) => ({ ...result, [item.hash]: item }),
      {}
    )
);

export const getPlugSetsRaw = (state: IApplicationState) =>
  state.manifest.plugSet;

export const getPlugSetsByHashRaw = createSelector(
  getPlugSetsRaw,
  (plugSets): Record<number, IPlugSetRaw> =>
    plugSets.reduce(
      (result, plugSet) => ({ ...result, [plugSet.hash]: plugSet }),
      {}
    )
);

export const getSocketCategoriesRaw = (state: IApplicationState) =>
  state.manifest.socketCategory;

export const getSocketCategoriesByHashRaw = createSelector(
  getSocketCategoriesRaw,
  (stats): Record<number, ISocketCategoryRaw> =>
    stats.reduce((result, stat) => ({ ...result, [stat.hash]: stat }), {})
);

export const getStatsRaw = (state: IApplicationState) => state.manifest.stat;

export const getStatsByHashRaw = createSelector(
  getStatsRaw,
  (stats): Record<number, IStatRaw> =>
    stats.reduce((result, stat) => ({ ...result, [stat.hash]: stat }), {})
);

export const getStatGroupsRaw = (state: IApplicationState) =>
  state.manifest.statGroup;

export const getStatGroupsByHashRaw = createSelector(
  getStatGroupsRaw,
  (stats): Record<number, IStatGroupRaw> =>
    stats.reduce((result, stat) => ({ ...result, [stat.hash]: stat }), {})
);

const InventoryItem = (
  inventoryItem: IInventoryItemRaw,
  statGroupsByHash: Record<number, IStatGroupRaw>,
  statsByHash: Record<number, IStatRaw>,
  socketCategoriesByHash: Record<number, ISocketCategoryRaw>,
  plugSetsByHash: Record<number, IPlugSetRaw>,
  inventoryItemsByHash: Record<number, IInventoryItemRaw>
): IInventoryItem => {
  const statGroup =
    inventoryItem.stats && statGroupsByHash[inventoryItem.stats.statGroupHash];

  return {
    displayProperties: {
      description: inventoryItem.displayProperties.description,
      name: inventoryItem.displayProperties.name,
      icon: inventoryItem.displayProperties.icon
    },
    itemTypeDisplayName: inventoryItem.itemTypeDisplayName,
    stats: inventoryItem.stats &&
      statGroup && {
        statGroup: {
          scaledStats: statGroup.scaledStats.map(scaledStat => ({
            stat: {
              displayProperties: {
                description:
                  statsByHash[scaledStat.statHash].displayProperties
                    .description,
                name: statsByHash[scaledStat.statHash].displayProperties.name
              },
              hash: statsByHash[scaledStat.statHash].hash
            },
            displayAsNumeric: scaledStat.displayAsNumeric,
            displayInterpolation: scaledStat.displayInterpolation
          })),
          hash: statGroup.hash
        }
      },
    sockets: inventoryItem.sockets && {
      socketEntries: inventoryItem.sockets.socketEntries.map(socketEntry => ({
        socketTypeHash: socketEntry.socketTypeHash,
        singleInitialItem:
          socketEntry.singleInitialItemHash !== 0
            ? InventoryItem(
                inventoryItemsByHash[socketEntry.singleInitialItemHash],
                statGroupsByHash,
                statsByHash,
                socketCategoriesByHash,
                plugSetsByHash,
                inventoryItemsByHash
              )
            : undefined,
        reusablePlugItems: socketEntry.reusablePlugItems.map(plugItem =>
          InventoryItem(
            inventoryItemsByHash[plugItem.plugItemHash],
            statGroupsByHash,
            statsByHash,
            socketCategoriesByHash,
            plugSetsByHash,
            inventoryItemsByHash
          )
        ),
        randomizedPlugSet: socketEntry.randomizedPlugSetHash
          ? {
              reusablePlugItems: plugSetsByHash[
                socketEntry.randomizedPlugSetHash
              ].reusablePlugItems.map(plugItem =>
                InventoryItem(
                  inventoryItemsByHash[plugItem.plugItemHash],
                  statGroupsByHash,
                  statsByHash,
                  socketCategoriesByHash,
                  plugSetsByHash,
                  inventoryItemsByHash
                )
              ),
              hash: plugSetsByHash[socketEntry.randomizedPlugSetHash].hash
            }
          : undefined,
        reusablePlugSet: socketEntry.reusablePlugSetHash
          ? {
              reusablePlugItems: plugSetsByHash[
                socketEntry.reusablePlugSetHash
              ].reusablePlugItems.map(plugItem =>
                InventoryItem(
                  inventoryItemsByHash[plugItem.plugItemHash],
                  statGroupsByHash,
                  statsByHash,
                  socketCategoriesByHash,
                  plugSetsByHash,
                  inventoryItemsByHash
                )
              ),
              hash: plugSetsByHash[socketEntry.reusablePlugSetHash].hash
            }
          : undefined
      })),
      socketCategories: inventoryItem.sockets.socketCategories.map(
        socketCategory => ({
          socketCategory: {
            displayProperties: {
              description:
                socketCategoriesByHash[socketCategory.socketCategoryHash]
                  .displayProperties.description,
              name:
                socketCategoriesByHash[socketCategory.socketCategoryHash]
                  .displayProperties.name
            },
            hash:
              socketCategoriesByHash[socketCategory.socketCategoryHash].hash,
            index:
              socketCategoriesByHash[socketCategory.socketCategoryHash].index
          },
          socketIndexes: socketCategory.socketIndexes
        })
      )
    },
    investmentStats: inventoryItem.investmentStats.map(investmentStat => ({
      stat: {
        displayProperties: {
          description:
            statsByHash[investmentStat.statTypeHash].displayProperties
              .description,
          name: statsByHash[investmentStat.statTypeHash].displayProperties.name
        },
        hash: statsByHash[investmentStat.statTypeHash].hash
      },
      value: investmentStat.value
    })),
    itemCategoryHashes: inventoryItem.itemCategoryHashes,
    itemType: inventoryItem.itemType,
    itemSubType: inventoryItem.itemSubType,
    hash: inventoryItem.hash
  };
};

export const getIsLoaded = (state: IApplicationState) => state.manifest.loaded;

export const getLoadingMessage = (state: IApplicationState) =>
  state.manifest.loadingMessage;

export const getInventoryItems = createSelector(
  getInventoryItemsByHashRaw,
  getStatGroupsByHashRaw,
  getStatsByHashRaw,
  getSocketCategoriesByHashRaw,
  getPlugSetsByHashRaw,
  (
    inventoryItemsByHash,
    statGroupsByHash,
    statsByHash,
    socketCategoriesByHash,
    plugSetsByHash
  ): IInventoryItem[] =>
    Object.values(inventoryItemsByHash).map(inventoryItem =>
      InventoryItem(
        inventoryItem,
        statGroupsByHash,
        statsByHash,
        socketCategoriesByHash,
        plugSetsByHash,
        inventoryItemsByHash
      )
    )
);

export const getInventoryItemsByHash = createSelector(
  getInventoryItems,
  inventoryItems =>
    inventoryItems.reduce(
      (inventoryItemsByHash, inventoryItem) =>
        inventoryItemsByHash.set(inventoryItem.hash, inventoryItem),
      new Map()
    )
);
