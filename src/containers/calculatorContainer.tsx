import { useSelector } from "react-redux";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeWeapon, changeSocket } from "../state/ducks/calculator/actions";
import { getInventoryItems } from "../state/ducks/manifest/selectors";
import {
  getSelectedInventoryItem,
  getSelectedPlugItems
} from "../state/ducks/calculator/selectors";
import Calculator from "../components/calculator";
import { IApplicationState } from "../state/ducks";

const CalculatorContainer = () => {
  const dispatch = useDispatch();

  const stateToProps = useSelector((state: IApplicationState) => ({
    inventoryItems: getInventoryItems(state),
    selectedInventoryItem: getSelectedInventoryItem(state),
    selectedPlugItems: getSelectedPlugItems(state)
  }));

  const dispatchToProps = {
    onItemChange: useCallback(itemHash => dispatch(changeWeapon(itemHash)), [
      dispatch
    ]),
    onSocketChange: useCallback(
      (index, plugItemHash) => dispatch(changeSocket({ index, plugItemHash })),
      [dispatch]
    )
  };

  return <Calculator {...stateToProps} {...dispatchToProps} />;
};

export default CalculatorContainer;
