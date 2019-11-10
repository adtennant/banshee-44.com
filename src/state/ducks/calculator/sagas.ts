import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { changeWeapon, changeSockets } from "./actions";
import { getSelectedInventoryItem } from "./selectors";
import { IApplicationState } from "..";

function* setDefaultSockets(): Generator {
  const state = yield select();
  const selectedItem = getSelectedInventoryItem(state as IApplicationState);

  if (selectedItem && selectedItem.sockets) {
    const defaultPlugItems = selectedItem.sockets.socketEntries.flatMap(
      entry => entry.singleInitialItem
    );

    const plugItemHashes = defaultPlugItems.reduce(
      (plugItemHashes, plugItem, i) => {
        if (plugItem) {
          plugItemHashes[i] = plugItem.hash;
        }
        return plugItemHashes;
      },
      new Array(defaultPlugItems.length).fill(0)
    );

    yield put(changeSockets(plugItemHashes));
  }
}

function* watchChangeWeapon(): Generator {
  yield takeEvery(changeWeapon, setDefaultSockets);
}

export default function* calculatorSaga() {
  yield all([fork(watchChangeWeapon)]);
}
