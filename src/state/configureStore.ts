import { applyMiddleware, createStore, Store } from "redux";
import { IApplicationState, rootReducer, rootSaga } from "./ducks/index";
import sagaMiddleware from "./middlewares/sagas";
import logger from "redux-logger";
import {
  createReduxLocationActions,
  listenForHistoryChange
} from "redux-location-state";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const { locationMiddleware, reducersWithLocation } = createReduxLocationActions(
  {
    "/": {
      state: {
        stateKey: "calculator",
        type: "object",
        options: {
          parse: (urlPathReturned: string) => {
            return JSON.parse(urlPathReturned);
          },
          serialize: (currentItemState: any) => {
            return JSON.stringify(currentItemState);
          }
        }
      },
      weapon: {
        stateKey: "old.weapon",
        type: "number"
      },
      socketEntries: {
        stateKey: "old.socketEntries",
        type: "array",
        options: {
          keepOrder: true,
          parse: (urlPathReturned: string) => {
            return urlPathReturned.split(",").map(hash => parseInt(hash, 10));
          },
          serialize: (currentItemState: number[]) => {
            return currentItemState && currentItemState.join(",");
          }
        }
      }
    }
  },
  (state: IApplicationState, location: any) => {
    console.log(location);

    switch (location.pathname) {
      case "/": {
        const { old, calculator } = location.query;

        const [itemHash, plugItemHashes] = (() => {
          if (old.weapon && old.socketEntries) {
            return [old.weapon, old.socketEntries];
          } else if (
            calculator &&
            calculator.itemHash &&
            calculator.plugItemHashes
          ) {
            return [calculator.itemHash, calculator.plugItemHashes];
          } else {
            return [undefined, []];
          }
        })();

        return {
          ...state,
          calculator: {
            ...state.calculator,
            itemHash: itemHash,
            plugItemHashes: plugItemHashes
          }
        };
      }
      default:
        return state;
    }
  },
  history,
  rootReducer
);

export default function configureStore(
  initialState: IApplicationState
): Store<IApplicationState> {
  const middlewares = applyMiddleware(
    logger,
    sagaMiddleware,
    locationMiddleware
  ); // Create Store
  const store = createStore(reducersWithLocation, initialState, middlewares);

  sagaMiddleware.run(rootSaga);
  listenForHistoryChange(store, history);

  return store;
}
