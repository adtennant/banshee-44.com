import React from "react";
import { useSelector } from "react-redux";
import { getLoadingMessage } from "../state/ducks/manifest/selectors";

const Loading = () => {
  const loadingMessage = useSelector(getLoadingMessage);
  return <span>{loadingMessage}...</span>;
};

export default Loading;
