import { ActionType, createReducer } from "typesafe-actions";
import * as actions from "./actions";
import {
  IInventoryItemRaw,
  IPlugSetRaw,
  ISocketCategoryRaw,
  IStatRaw,
  IStatGroupRaw
} from "./types";

export interface IManifestState {
  readonly inventoryItem: IInventoryItemRaw[];
  readonly plugSet: IPlugSetRaw[];
  readonly socketCategory: ISocketCategoryRaw[];
  readonly stat: IStatRaw[];
  readonly statGroup: IStatGroupRaw[];
  readonly loaded: boolean;
  readonly loadingMessage: string;
  readonly errors: any[];
}

type ManifestAction = ActionType<typeof actions>;

export const manifestReducer = createReducer<IManifestState, ManifestAction>({
  inventoryItem: [],
  plugSet: [],
  socketCategory: [],
  stat: [],
  statGroup: [],
  loaded: false,
  loadingMessage: "",
  errors: []
})
  .handleAction(actions.fetchInventoryItemsAsync.success, (state, action) => ({
    ...state,
    inventoryItem: action.payload
  }))
  .handleAction(actions.fetchPlugSetsAsync.success, (state, action) => ({
    ...state,
    plugSet: action.payload
  }))
  .handleAction(
    actions.fetchSocketCategoriesAsync.success,
    (state, action) => ({
      ...state,
      socketCategory: action.payload
    })
  )
  .handleAction(actions.fetchStatsAsync.success, (state, action) => ({
    ...state,
    stat: action.payload
  }))
  .handleAction(actions.fetchStatGroupsAsync.success, (state, action) => ({
    ...state,
    statGroup: action.payload
  }))
  .handleAction(
    [
      actions.fetchInventoryItemsAsync.failure,
      actions.fetchPlugSetsAsync.failure,
      actions.fetchSocketCategoriesAsync.failure,
      actions.fetchStatsAsync.failure,
      actions.fetchStatGroupsAsync.failure
    ],
    (state, action) => ({
      ...state,
      errors: [...state.errors, action.payload]
    })
  )
  .handleAction(actions.loadManifest.success, state => ({
    ...state,
    loaded: true
  }))
  .handleAction(actions.setLoadingMessage, (state, action) => ({
    ...state,
    loadingMessage: action.payload
  }));
