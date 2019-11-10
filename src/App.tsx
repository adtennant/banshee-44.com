import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoaded } from "./state/ducks/manifest/selectors";
import { loadManifest } from "./state/ducks/manifest/actions";
import CalculatorContainer from "./containers/calculatorContainer";
import Layout from "./components/layout";
import Loading from "./containers/loading";

const App = () => {
  const dispatch = useDispatch();

  const isLoaded = useSelector(getIsLoaded);

  useEffect(() => {
    dispatch(loadManifest.request());
  }, [dispatch]);

  return (
    <Layout>
      <div
        style={{
          background: "rgba(255, 0, 0, 0.3)",
          border: "1px solid rgba(255, 0, 0, 0.5)",
          borderRadius: "0.25rem",
          margin: "0.5rem auto",
          padding: "0.5rem",
          width: "80%"
        }}
      >
        <p style={{ marginTop: "0" }}>
          Welcome to the new version of Banshee-44.com.
        </p>
        <p>
          This is a work in progress. Please report any issues you find or
          features you'd like to see on the{" "}
          <a href="https://github.com/adtennant/banshee-44.com/issues">
            Github Issues
          </a>{" "}
          page.
        </p>
        <p style={{ marginBottom: "0" }}>
          PS. Banshee-44.com is now open source.
        </p>
      </div>
      {!isLoaded ? <Loading /> : <CalculatorContainer />}
    </Layout>
  );
};

export default App;
