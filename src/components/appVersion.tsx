import React from "react";
import packageJSON from "../../package.json";

const AppVersion = () => {
  return <div>Version: {packageJSON.version}</div>;
};

export default AppVersion;
