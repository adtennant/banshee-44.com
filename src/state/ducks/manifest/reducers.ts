import { ActionType, createReducer } from "typesafe-actions";
import {
  fetchInventoryItemsAsync,
  fetchPlugSetsAsync,
  fetchStatsAsync,
  fetchStatGroupsAsync,
  fetchSocketCategoriesAsync,
  fetchVersionAsync
} from "./actions";
import {
  IInventoryItemRaw,
  IPlugSetRaw,
  ISocketCategoryRaw,
  IStatRaw,
  IStatGroupRaw
} from "./types";
import { combineReducers } from "redux";

export interface IInventoryItemState {
  readonly data: IInventoryItemRaw[];
  readonly loading: boolean;
  readonly errors: any[];
}

export type InventoryItemAction = ActionType<typeof fetchInventoryItemsAsync>;

export const inventoryItemReducer = createReducer<
  IInventoryItemState,
  InventoryItemAction
>({
  loading: false,
  data: [],
  errors: []
})
  .handleAction(fetchInventoryItemsAsync.request, state => ({
    ...state,
    loading: true
  }))
  .handleAction(fetchInventoryItemsAsync.success, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false
  }))
  .handleAction(fetchInventoryItemsAsync.failure, (state, action) => ({
    ...state,
    errors: [...state.errors, action.payload],
    loading: false
  }));

export interface IPlugSetState {
  readonly data: IPlugSetRaw[];
  readonly loading: boolean;
  readonly errors: any[];
}

export type PlugSetAction = ActionType<typeof fetchPlugSetsAsync>;

export const plugSetReducer = createReducer<IPlugSetState, PlugSetAction>({
  loading: false,
  data: [],
  errors: []
})
  .handleAction(fetchPlugSetsAsync.request, state => ({
    ...state,
    loading: true
  }))
  .handleAction(fetchPlugSetsAsync.success, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false
  }))
  .handleAction(fetchPlugSetsAsync.failure, (state, action) => ({
    ...state,
    errors: [...state.errors, action.payload],
    loading: false
  }));

export interface ISocketCategoryState {
  readonly data: ISocketCategoryRaw[];
  readonly loading: boolean;
  readonly errors: any[];
}

export type SocketCategoryAction = ActionType<
  typeof fetchSocketCategoriesAsync
>;

export const socketCategoryReducer = createReducer<
  ISocketCategoryState,
  SocketCategoryAction
>({
  loading: false,
  data: [],
  errors: []
})
  .handleAction(fetchSocketCategoriesAsync.request, state => ({
    ...state,
    loading: true
  }))
  .handleAction(fetchSocketCategoriesAsync.success, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false
  }))
  .handleAction(fetchSocketCategoriesAsync.failure, (state, action) => ({
    ...state,
    errors: [...state.errors, action.payload],
    loading: false
  }));

export interface IStatState {
  readonly data: IStatRaw[];
  readonly loading: boolean;
  readonly errors: any[];
}

export type StatAction = ActionType<typeof fetchStatsAsync>;

export const statReducer = createReducer<IStatState, StatAction>({
  loading: false,
  data: [],
  errors: []
})
  .handleAction(fetchStatsAsync.request, state => ({
    ...state,
    loading: true
  }))
  .handleAction(fetchStatsAsync.success, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false
  }))
  .handleAction(fetchStatsAsync.failure, (state, action) => ({
    ...state,
    errors: [...state.errors, action.payload],
    loading: false
  }));

export interface IStatGroupState {
  readonly data: IStatGroupRaw[];
  readonly loading: boolean;
  readonly errors: any[];
}

export type StatGroupAction = ActionType<typeof fetchStatGroupsAsync>;

export const statGroupReducer = createReducer<IStatGroupState, StatGroupAction>(
  {
    loading: false,
    data: [],
    errors: []
  }
)
  .handleAction(fetchStatGroupsAsync.request, state => ({
    ...state,
    loading: true
  }))
  .handleAction(fetchStatGroupsAsync.success, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false
  }))
  .handleAction(fetchStatGroupsAsync.failure, (state, action) => ({
    ...state,
    errors: [...state.errors, action.payload],
    loading: false
  }));

export interface IVersionState {
  readonly data: string;
  readonly loading: boolean;
  readonly errors: any[];
}

export type VersionAction = ActionType<typeof fetchVersionAsync>;

export const versionReducer = createReducer<IVersionState, VersionAction>({
  loading: false,
  data: "",
  errors: []
})
  .handleAction(fetchVersionAsync.request, state => ({
    ...state,
    loading: true
  }))
  .handleAction(fetchVersionAsync.success, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false
  }))
  .handleAction(fetchVersionAsync.failure, (state, action) => ({
    ...state,
    errors: [...state.errors, action.payload],
    loading: false
  }));

export const manifestReducer = combineReducers({
  inventoryItem: inventoryItemReducer,
  plugSet: plugSetReducer,
  socketCategory: socketCategoryReducer,
  stat: statReducer,
  statGroup: statGroupReducer,
  version: versionReducer
});
