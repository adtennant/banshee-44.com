import { applyMiddleware, createStore, Store } from "redux";
import { IApplicationState, rootReducer, rootSaga } from "./ducks/index";
import sagaMiddleware from "./middlewares/sagas";
import logger from "redux-logger";

export default function configureStore(
  initialState: IApplicationState
): Store<IApplicationState> {
  const middlewares = applyMiddleware(logger, sagaMiddleware); // Create Store
  const store = createStore(rootReducer, initialState, middlewares);

  sagaMiddleware.run(rootSaga);

  return store;
}
