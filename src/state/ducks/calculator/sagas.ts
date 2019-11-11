import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { changeWeapon, changeSockets } from "./actions";
import { getSelectedInventoryItem, getSelectedPlugItems } from "./selectors";
import { IApplicationState } from "..";
import { ISocketEntry } from "../manifest/types";

const plugItems = (socket: ISocketEntry) => {
  const plugSet = socket.randomizedPlugSet || socket.reusablePlugSet;

  if (plugSet) {
    return plugSet.reusablePlugItems;
  } else if (socket.singleInitialItem && socket.reusablePlugItems.length > 0) {
    return socket.reusablePlugItems.some(
      // Use the name not the hash because dummy masterwork items have different hashes
      plugItem =>
        plugItem.displayProperties.name ===
        socket.singleInitialItem!.displayProperties.name
    )
      ? socket.reusablePlugItems
      : [socket.singleInitialItem, ...socket.reusablePlugItems];
  } else if (socket.reusablePlugItems.length > 0) {
    return socket.reusablePlugItems;
  } else {
    return [socket.singleInitialItem!];
  }
};

function* setDefaultSockets(): Generator {
  const state = yield select();
  const selectedItem = getSelectedInventoryItem(state as IApplicationState);

  if (selectedItem && selectedItem.sockets) {
    const defaultPlugItems = selectedItem.sockets.socketEntries.flatMap(
      entry => entry.singleInitialItem || plugItems(entry)[0]
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
