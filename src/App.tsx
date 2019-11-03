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
      {!isLoaded ? (
        <Loading />
      ) : (
        <>
          <p style={{ color: "red" }}>
            Please be aware this is a work in progress (in case it wasn't
            obvious). Calculations are accurate but everything else is subject
            to change and continuous improvement.
          </p>
          <CalculatorContainer />
        </>
      )}
    </Layout>
  );
};

export default App;
