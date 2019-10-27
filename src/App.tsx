import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoaded } from "./state/ducks/manifest/selectors";
import { loadManifest } from "./state/ducks/manifest/actions";
import Calculator from "./containers/calculator";
import ManifestVersion from "./containers/mainfestVersion";
import AppVersion from "./components/appVersion";
import logo from "./logo.png";

const App = () => {
  const dispatch = useDispatch();

  const isLoaded = useSelector(getIsLoaded);

  useEffect(() => {
    dispatch(loadManifest.request());
  }, [dispatch]);

  return (
    <>
      <div style={{ minHeight: "calc(100vh - 60px)" }}>
        <div
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            borderTop: "220px solid rgb(114, 114, 115)",
            borderLeft: "220px solid rgb(114, 114, 115)",
            borderBottom: "220px solid transparent",
            borderRight: "220px solid transparent",
            zIndex: -10
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            borderTop: "380px solid rgb(152, 153, 154)",
            borderLeft: "380px solid rgb(152, 153, 154)",
            borderBottom: "380px solid transparent",
            borderRight: "380px solid transparent",
            zIndex: -20
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            borderTop: "460px solid rgb(132, 133, 134)",
            borderLeft: "460px solid rgb(132, 133, 134)",
            borderBottom: "460px solid transparent",
            borderRight: "460px solid transparent",
            zIndex: -30
          }}
        ></div>
        <header
          style={{
            //position: "relative",
            color: "rgb(255, 255, 255)",
            height: "80px",
            textTransform: "uppercase"
            //zIndex: 0
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              zIndex: -1
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                width: "100%",
                height: "54px"
              }}
            ></div>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(rgba(152, 153, 154, 0), rgba(152, 153, 154, 0.5), rgba(152, 153, 154, 0))",
                width: "100%",
                height: "16px",
                marginTop: "-4px"
              }}
            ></div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              justifyContent: "start",
              alignContent: "center",
              maxWidth: "calc(100vw - 4rem)",
              height: "108px",
              margin: "0 auto"
            }}
          >
            <div>
              <img
                alt=""
                style={{
                  height: "78px",
                  marginRight: "1rem"
                }}
                src={logo}
              />
            </div>
            <h1 style={{ alignSelf: "center", fontSize: "2rem", margin: "0" }}>
              Banshee-44
            </h1>
          </div>
        </header>
        <main>
          <div
            style={{
              width: "100%",
              maxWidth: "calc(100vw - 4rem)",
              margin: "0 auto"
            }}
          >
            <p style={{ color: "red" }}>
              Please be aware this is a work in progress (in case it wasn't
              obvious). Calculations are accurate but everything else is subject
              to change and continuous improvement.
            </p>
            {!isLoaded ? (
              <span>Loading (this may take a while)...</span>
            ) : (
              <Calculator />
            )}
          </div>
        </main>
      </div>
      <footer
        style={{
          display: "grid",
          alignContent: "center",
          backgroundColor: "rgb(0, 0, 0)",
          color: "rgb(255, 255, 255)",
          fontWeight: "bold",
          fontSize: "0.8rem",
          height: "60px"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "calc(100vw - 4rem)",
            margin: "0 auto"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              gridGap: "1rem"
            }}
          >
            <a
              href="https://github.com/adtennant/banshee-44.com"
              rel="noopener noreferrer"
              target="_blank"
              style={{
                color: "rgb(255, 255, 255)",
                textDecoration: "none"
              }}
            >
              Github
            </a>
            <a
              href="https://twitter.com/adtennant"
              rel="noopener noreferrer"
              target="_blank"
              style={{
                color: "rgb(255, 255, 255)",
                textDecoration: "none"
              }}
            >
              Twitter
            </a>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              gridGap: "1rem"
            }}
          >
            <AppVersion />
            <ManifestVersion />
            <div>Copyright &copy; 2019 Alex Tennant</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
