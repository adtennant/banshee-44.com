import { createAsyncAction, createStandardAction } from "typesafe-actions";
import {
  IInventoryItemRaw,
  IPlugSetRaw,
  ISocketCategoryRaw,
  IStatRaw,
  IStatGroupRaw
} from "./types";

export const fetchInventoryItemsAsync = createAsyncAction(
  "@@manifest/FETCH_PLUG_ITEMS_REQUEST",
  "@@manifest/FETCH_PLUG_ITEMS_SUCCESS",
  "@@manifest/FETCH_PLUG_ITEMS_ERROR"
)<undefined, IInventoryItemRaw[], string>();

export const fetchPlugSetsAsync = createAsyncAction(
  "@@manifest/FETCH_PLUG_SETS_REQUEST",
  "@@manifest/FETCH_PLUG_SETS_SUCCESS",
  "@@manifest/FETCH_PLUG_SETS_ERROR"
)<undefined, IPlugSetRaw[], string>();

export const fetchSocketCategoriesAsync = createAsyncAction(
  "@@manifest/FETCH_SOCKET_CATEGORIES_REQUEST",
  "@@manifest/FETCH_SOCKET_CATEGORIES_SUCCESS",
  "@@manifest/FETCH_SOCKET_CATEGORIES_ERROR"
)<undefined, ISocketCategoryRaw[], string>();

export const fetchStatsAsync = createAsyncAction(
  "@@manifest/FETCH_STATS_REQUEST",
  "@@manifest/FETCH_STATS_SUCCESS",
  "@@manifest/FETCH_STATS_ERROR"
)<undefined, IStatRaw[], string>();

export const fetchStatGroupsAsync = createAsyncAction(
  "@@manifest/FETCH_STAT_GROUPS_REQUEST",
  "@@manifest/FETCH_STAT_GROUPS_SUCCESS",
  "@@manifest/FETCH_STAT_GROUPS_ERROR"
)<undefined, IStatGroupRaw[], string>();

export const fetchVersionAsync = createAsyncAction(
  "@@manifest/FETCH_VERSION_REQUEST",
  "@@manifest/FETCH_VERSION_SUCCESS",
  "@@manifest/FETCH_VERSION_ERROR"
)<undefined, string, string>();

export const fetchManifest = createStandardAction(
  "@@manifest/FETCH_MANIFEST"
)();
