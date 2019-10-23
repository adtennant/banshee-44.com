import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { ICalculatorState, calculatorReducer } from "./calculator/reducers";
import calculatorSaga from "./calculator/sagas";
import manifestSaga from "./manifest/sagas";
import { manifestReducer } from "./manifest/reducers";
import { StateType } from "typesafe-actions";

export interface IApplicationState {
  calculator: ICalculatorState;
  manifest: StateType<typeof manifestReducer>;
  /*inventoryItem: IInventoryItemState;
  plugSet: IPlugSetState;
  socketCategory: ISocketCategoryState;
  stat: IStatState;
  statGroup: IStatGroupState;*/
}

export const rootReducer = combineReducers<IApplicationState>({
  calculator: calculatorReducer,
  manifest: manifestReducer
  /*inventoryItem: inventoryItemReducer,
  plugSet: plugSetReducer,
  socketCategory: socketCategoryReducer,
  stat: statReducer,
  statGroup: statGroupReducer*/
});

export function* rootSaga() {
  yield all([
    fork(calculatorSaga),
    fork(manifestSaga)
    /*fork(plugSetSaga),
    fork(socketCategorySaga),
    fork(statSaga),
    fork(statGroupSaga)*/
  ]);
}
