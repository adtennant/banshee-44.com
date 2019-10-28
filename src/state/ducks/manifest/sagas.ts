import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import tyraKarn from "../../utils/tyraKarn";
import {
  fetchInventoryItemsAsync,
  fetchStatGroupsAsync,
  fetchStatsAsync,
  fetchSocketCategoriesAsync,
  fetchPlugSetsAsync,
  loadManifest,
  setLoadingMessage
} from "./actions";
import {
  IInventoryItemRaw,
  IStatGroupRaw,
  IStatRaw,
  ISocketCategoryRaw,
  IPlugSetRaw,
  IManifestRaw
} from "./types";
import packageJSON from "../../../../package.json";
import localStorage from "../../utils/localStorage";

function* handleFetchInventoryItems(): Generator {
  try {
    const res: IInventoryItemRaw[] | any = yield call(
      tyraKarn,
      "/DestinyManifest/mobileWorldContentPaths/en/DestinyInventoryItemDefinition/" +
        '?filter={"$or":[{"itemCategoryHashes":{"$elemMatch":{"$eq":1}}},{"itemCategoryHashes":{"$elemMatch":{"$eq":41}}},{"itemCategoryHashes":{"$elemMatch":{"$eq":59}}}]}' +
        '&select={"displayProperties.description":1,"displayProperties.name":1,"displayProperties.icon":1,"itemTypeDisplayName":1,' +
        '"stats.statGroupHash":1,"sockets.socketEntries":1,"sockets.socketCategories":1,' +
        '"investmentStats.statTypeHash":1,"investmentStats.value":1,' +
        '"itemCategoryHashes":1,"itemType":1,"itemSubType":1,"hash":1}'
    );

    yield all([
      put(fetchInventoryItemsAsync.success(res)),
      call([localStorage, localStorage.setItem], "inventoryItem", res)
    ]);
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchInventoryItemsAsync.failure(err.stack!));
    } else {
      yield put(fetchInventoryItemsAsync.failure("An unknown error occured."));
    }
  }
}

function* handleFetchPlugSets(): Generator {
  try {
    const res: IPlugSetRaw[] | any = yield call(
      tyraKarn,
      "/DestinyManifest/mobileWorldContentPaths/en/DestinyPlugSetDefinition/" +
        '?select={"reusablePlugItems.plugItemHash":1,"hash":1}'
    );

    yield all([
      put(fetchPlugSetsAsync.success(res)),
      call([localStorage, localStorage.setItem], "plugSet", res)
    ]);
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchPlugSetsAsync.failure(err.stack!));
    } else {
      yield put(fetchPlugSetsAsync.failure("An unknown error occured."));
    }
  }
}

function* handleFetchSocketCategories(): Generator {
  try {
    const res: ISocketCategoryRaw[] | any = yield call(
      tyraKarn,
      "/DestinyManifest/mobileWorldContentPaths/en/DestinySocketCategoryDefinition/" +
        '?select={"displayProperties.description":1,"displayProperties.name":1,"hash":1,"index":1}'
    );

    yield all([
      put(fetchSocketCategoriesAsync.success(res)),
      call([localStorage, localStorage.setItem], "socketCategory", res)
    ]);
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchSocketCategoriesAsync.failure(err.stack!));
    } else {
      yield put(
        fetchSocketCategoriesAsync.failure("An unknown error occured.")
      );
    }
  }
}

function* handleFetchStats(): Generator {
  try {
    const res: IStatRaw[] | any = yield call(
      tyraKarn,
      "/DestinyManifest/mobileWorldContentPaths/en/DestinyStatDefinition/" +
        '?select={"displayProperties.description":1,"displayProperties.name":1,"hash":1}'
    );

    yield all([
      put(fetchStatsAsync.success(res)),
      call([localStorage, localStorage.setItem], "stat", res)
    ]);
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchStatsAsync.failure(err.stack!));
    } else {
      yield put(fetchStatsAsync.failure("An unknown error occured."));
    }
  }
}

function* handleFetchStatGroups(): Generator {
  try {
    const res: IStatGroupRaw[] | any = yield call(
      tyraKarn,
      "/DestinyManifest/mobileWorldContentPaths/en/DestinyStatGroupDefinition/" +
        '?select={"scaledStats.statHash":1,"scaledStats.displayAsNumeric":1,"scaledStats.displayInterpolation":1,"hash":1}'
    );

    yield all([
      put(fetchStatGroupsAsync.success(res)),
      call([localStorage, localStorage.setItem], "statGroup", res)
    ]);
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchStatGroupsAsync.failure(err.stack!));
    } else {
      yield put(fetchStatGroupsAsync.failure("An unknown error occured."));
    }
  }
}

const fetchManifestVersion = async () => {
  const manifest: IManifestRaw = await fetch(
    `https://api.tyra-karn.com/DestinyManifest/`,
    {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }
  ).then(res => res.json());

  return manifest.version;
};

function* updateManifest(): Generator {
  yield all([
    fork(handleFetchInventoryItems),
    fork(handleFetchPlugSets),
    fork(handleFetchSocketCategories),
    fork(handleFetchStats),
    fork(handleFetchStatGroups)
  ]);
}

function* loadManifestFromStorage(): Generator {
  const [
    inventoryItems,
    plugSets,
    socketCategories,
    stats,
    statGroups
  ]: any = yield all([
    call([localStorage, localStorage.getItem], "inventoryItem"),
    call([localStorage, localStorage.getItem], "plugSet"),
    call([localStorage, localStorage.getItem], "socketCategory"),
    call([localStorage, localStorage.getItem], "stat"),
    call([localStorage, localStorage.getItem], "statGroup")
  ]);

  yield all([
    put(fetchInventoryItemsAsync.success(inventoryItems)),
    put(fetchPlugSetsAsync.success(plugSets)),
    put(fetchSocketCategoriesAsync.success(socketCategories)),
    put(fetchStatsAsync.success(stats)),
    put(fetchStatGroupsAsync.success(statGroups))
  ]);
}

function* handleLoadManifest(): Generator {
  yield put(setLoadingMessage("Checking Manifest Version"));

  const [currentAppVersion, savedAppVersion]: string[] | any = yield all([
    packageJSON.version,
    call([localStorage, localStorage.getItem], "appVersion")
  ]);

  const [currentManifestVersion, savedManifestVersion]:
    | string[]
    | any = yield all([
    call(fetchManifestVersion),
    call([localStorage, localStorage.getItem], "manifestVersion")
  ]);

  if (
    currentAppVersion !== savedAppVersion ||
    currentManifestVersion !== savedManifestVersion
  ) {
    yield put(setLoadingMessage("Updating Manifest"));

    yield call(updateManifest);

    yield all([
      call(
        [localStorage, localStorage.setItem],
        "appVersion",
        currentAppVersion
      ),
      call(
        [localStorage, localStorage.setItem],
        "manifestVersion",
        currentManifestVersion
      )
    ]);
  } else {
    yield put(setLoadingMessage("Loading Manifest"));

    yield call(loadManifestFromStorage);
  }

  yield put(loadManifest.success());
}

function* watchLoadManifest(): Generator {
  yield takeEvery(loadManifest.request, handleLoadManifest);
}

export default function* manifestSaga() {
  yield all([fork(watchLoadManifest)]);
}
