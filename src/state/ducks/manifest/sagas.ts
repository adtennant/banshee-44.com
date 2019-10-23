import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import tyraKarn from "../../utils/tyraKarn";
import {
  fetchInventoryItemsAsync,
  fetchStatGroupsAsync,
  fetchStatsAsync,
  fetchSocketCategoriesAsync,
  fetchPlugSetsAsync,
  fetchManifest,
  fetchVersionAsync
} from "./actions";
import {
  IInventoryItemRaw,
  IStatGroupRaw,
  IStatRaw,
  ISocketCategoryRaw,
  IPlugSetRaw,
  IManifestRaw
} from "./types";

function* fetchInventoryItems(): Generator {
  yield put(fetchInventoryItemsAsync.request());

  try {
    const res: IInventoryItemRaw[] | any = yield call(
      tyraKarn,
      "/DestinyManifest/mobileWorldContentPaths/en/DestinyInventoryItemDefinition/" +
        '?filter={"$or":[{"itemCategoryHashes":{"$elemMatch":{"$eq":1}}},{"itemCategoryHashes":{"$elemMatch":{"$eq":41}}},{"itemCategoryHashes":{"$elemMatch":{"$eq":59}}}]}' +
        '&select={"displayProperties.description":1,"displayProperties.name":1,"stats.statGroupHash":1,' +
        '"sockets.socketEntries":1,"sockets.socketCategories":1,' +
        '"investmentStats.statTypeHash":1,"investmentStats.value":1,' +
        '"itemCategoryHashes":1,"itemType":1,"itemSubType":1,"hash":1}'
    );

    yield put(fetchInventoryItemsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchInventoryItemsAsync.failure(err.stack!));
    } else {
      yield put(fetchInventoryItemsAsync.failure("An unknown error occured."));
    }
  }
}

function* fetchPlugSets(): Generator {
  yield put(fetchPlugSetsAsync.request());

  try {
    const res: IPlugSetRaw[] | any = yield call(
      tyraKarn,
      "/DestinyManifest/mobileWorldContentPaths/en/DestinyPlugSetDefinition/" +
        '?select={"reusablePlugItems.plugItemHash":1,"hash":1}'
    );

    yield put(fetchPlugSetsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchPlugSetsAsync.failure(err.stack!));
    } else {
      yield put(fetchPlugSetsAsync.failure("An unknown error occured."));
    }
  }
}

function* fetchSocketCategories(): Generator {
  yield put(fetchSocketCategoriesAsync.request());

  try {
    const res: ISocketCategoryRaw[] | any = yield call(
      tyraKarn,
      "/DestinyManifest/mobileWorldContentPaths/en/DestinySocketCategoryDefinition/" +
        '?select={"displayProperties.description":1,"displayProperties.name":1,"hash":1,"index":1}'
    );

    yield put(fetchSocketCategoriesAsync.success(res));
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

function* fetchStats(): Generator {
  yield put(fetchStatsAsync.request());

  try {
    const res: IStatRaw[] | any = yield call(
      tyraKarn,
      "/DestinyManifest/mobileWorldContentPaths/en/DestinyStatDefinition/" +
        '?select={"displayProperties.description":1,"displayProperties.name":1,"hash":1}'
    );

    yield put(fetchStatsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchStatsAsync.failure(err.stack!));
    } else {
      yield put(fetchStatsAsync.failure("An unknown error occured."));
    }
  }
}

function* fetchStatGroups(): Generator {
  yield put(fetchStatGroupsAsync.request());

  try {
    const res: IStatGroupRaw[] | any = yield call(
      tyraKarn,
      "/DestinyManifest/mobileWorldContentPaths/en/DestinyStatGroupDefinition/" +
        '?select={"scaledStats.statHash":1,"scaledStats.displayAsNumeric":1,"scaledStats.displayInterpolation":1,"hash":1}'
    );

    yield put(fetchStatGroupsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchStatGroupsAsync.failure(err.stack!));
    } else {
      yield put(fetchStatGroupsAsync.failure("An unknown error occured."));
    }
  }
}

function* fetchVersion(): Generator {
  yield put(fetchVersionAsync.request());

  try {
    const res: Response | any = yield call(
      fetch,
      `https://api.tyra-karn.com/DestinyManifest/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    );

    const manifest: IManifestRaw | any = yield call([res, res.json]);
    yield put(fetchVersionAsync.success(manifest.version));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchVersionAsync.failure(err.stack!));
    } else {
      yield put(fetchVersionAsync.failure("An unknown error occured."));
    }
  }
}

function* watchFetchManifest(): Generator {
  yield takeEvery(fetchManifest, fetchInventoryItems);
  yield takeEvery(fetchManifest, fetchPlugSets);
  yield takeEvery(fetchManifest, fetchSocketCategories);
  yield takeEvery(fetchManifest, fetchStats);
  yield takeEvery(fetchManifest, fetchStatGroups);
  yield takeEvery(fetchManifest, fetchVersion);
}

export default function* manifestSaga() {
  yield all([fork(watchFetchManifest)]);
}
