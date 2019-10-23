import { ActionType, createReducer } from "typesafe-actions";

import * as actions from "./actions";

export interface ICalculatorState {
  readonly itemHash: number;
  readonly plugItemHashes: number[];
}

export const initialState: ICalculatorState = {
  itemHash: 0,
  plugItemHashes: []
};

export type CalculatorAction = ActionType<typeof actions>;

export const calculatorReducer = createReducer<
  ICalculatorState,
  CalculatorAction
>(initialState)
  .handleAction(actions.changeWeapon, (state, action) => ({
    ...state,
    itemHash: action.payload
  }))
  .handleAction(actions.changeSocket, (state, action) => {
    const plugItemHashes = [...state.plugItemHashes];
    plugItemHashes[action.payload.index] = action.payload.plugItemHash;
    return { ...state, plugItemHashes };
  })
  .handleAction(actions.changeSockets, (state, action) => ({
    ...state,
    plugItemHashes: action.payload
  }));
