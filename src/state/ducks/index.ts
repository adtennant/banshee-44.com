import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { ICalculatorState, calculatorReducer } from "./calculator/reducers";
import calculatorSaga from "./calculator/sagas";
import manifestSaga from "./manifest/sagas";
import { IManifestState, manifestReducer } from "./manifest/reducers";

export interface IApplicationState {
  calculator: ICalculatorState;
  manifest: IManifestState;
}

export const rootReducer = combineReducers<IApplicationState>({
  calculator: calculatorReducer,
  manifest: manifestReducer
});

export function* rootSaga() {
  yield all([fork(calculatorSaga), fork(manifestSaga)]);
}
