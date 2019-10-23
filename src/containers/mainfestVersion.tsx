import { useSelector } from "react-redux";
import React from "react";
import { getVersion } from "../state/ducks/manifest/selectors";

const ManifestVersion = () => {
  const mainfestVersion = useSelector(getVersion);
  return <div>Manifest: {mainfestVersion}</div>;
};

export default ManifestVersion;
