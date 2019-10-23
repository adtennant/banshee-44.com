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

export const getInventoryItemsLoading = (state: IApplicationState) =>
  state.manifest.inventoryItem.loading;

export const getInventoryItemsRaw = (state: IApplicationState) =>
  state.manifest.inventoryItem.data;

export const getInventoryItemsByHashRaw = createSelector(
  getInventoryItemsRaw,
  (inventoryItems): Record<number, IInventoryItemRaw> =>
    inventoryItems.reduce(
      (result, item) => ({ ...result, [item.hash]: item }),
      {}
    )
);

export const getPlugSetsLoading = (state: IApplicationState) =>
  state.manifest.plugSet.loading;

export const getPlugSetsRaw = (state: IApplicationState) =>
  state.manifest.plugSet.data;

export const getPlugSetsByHashRaw = createSelector(
  getPlugSetsRaw,
  (plugSets): Record<number, IPlugSetRaw> =>
    plugSets.reduce(
      (result, plugSet) => ({ ...result, [plugSet.hash]: plugSet }),
      {}
    )
);

export const getSocketCategoriesLoading = (state: IApplicationState) =>
  state.manifest.socketCategory.loading;

export const getSocketCategoriesRaw = (state: IApplicationState) =>
  state.manifest.socketCategory.data;

export const getSocketCategoriesByHashRaw = createSelector(
  getSocketCategoriesRaw,
  (stats): Record<number, ISocketCategoryRaw> =>
    stats.reduce((result, stat) => ({ ...result, [stat.hash]: stat }), {})
);

export const getStatsLoading = (state: IApplicationState) =>
  state.manifest.stat.loading;

export const getStatsRaw = (state: IApplicationState) =>
  state.manifest.stat.data;

export const getStatsByHashRaw = createSelector(
  getStatsRaw,
  (stats): Record<number, IStatRaw> =>
    stats.reduce((result, stat) => ({ ...result, [stat.hash]: stat }), {})
);

export const getStatGroupsLoading = (state: IApplicationState) =>
  state.manifest.statGroup.loading;

export const getStatGroupsRaw = (state: IApplicationState) =>
  state.manifest.statGroup.data;

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
      name: inventoryItem.displayProperties.name
    },
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

export const getManifestLoading = createSelector(
  getInventoryItemsLoading,
  getPlugSetsLoading,
  getSocketCategoriesLoading,
  getStatsLoading,
  getStatGroupsLoading,
  (
    inventoryItemsLoading,
    plugSetsLoading,
    socketCategoriesLoading,
    statsLoading,
    statGroupsLoading
  ) =>
    inventoryItemsLoading ||
    plugSetsLoading ||
    socketCategoriesLoading ||
    statsLoading ||
    statGroupsLoading
);

export const getIsLoading = (state: IApplicationState) =>
  state.manifest.inventoryItem.loading ||
  state.manifest.plugSet.loading ||
  state.manifest.socketCategory.loading ||
  state.manifest.stat.loading ||
  state.manifest.statGroup.loading ||
  state.manifest.version.loading;

export const getVersion = (state: IApplicationState) =>
  state.manifest.version.data;

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
