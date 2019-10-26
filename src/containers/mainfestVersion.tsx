import React, { useState, useEffect } from "react";
import localStorage from "../state/utils/localStorage";

const ManifestVersion = () => {
  const [manifestVersion, setManifestVersion] = useState("");

  useEffect(() => {
    (async () => {
      const result: string = await localStorage.getItem("manifestVersion");
      setManifestVersion(result);
    })();
  }, []);

  return <div>Manifest: {manifestVersion}</div>;
};

export default ManifestVersion;
