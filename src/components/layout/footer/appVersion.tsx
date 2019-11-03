import React from "react";
import packageJSON from "../../../../package.json";

const AppVersion = () => {
  return <span>Version: {packageJSON.version}</span>;
};

export default AppVersion;
