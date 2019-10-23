import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoading } from "./state/ducks/manifest/selectors";
import { fetchManifest } from "./state/ducks/manifest/actions";
import Calculator from "./containers/calculator";
import ManifestVersion from "./containers/mainfestVersion";
import AppVersion from "./components/appVersion";

const App = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchManifest());
  }, [dispatch]);

  return (
    <>
      <p style={{ color: "red" }}>
        Please be aware this is a work in progress (in case it wasn't obvious).
        Calculations are accurate but everything else is subject to change and
        continuous improvement.
      </p>
      {isLoading ? (
        <span>Loading (this may take a while)...</span>
      ) : (
        <>
          <div style={{ minHeight: "calc(100vh - 80px)" }}>
            <header>
              <h1>Banshee-44</h1>
            </header>
            <main>
              <Calculator />
            </main>
          </div>
          <footer style={{ height: "80px" }}>
            <AppVersion />
            <ManifestVersion />
          </footer>
        </>
      )}
    </>
  );
};

export default App;
