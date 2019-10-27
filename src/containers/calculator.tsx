import { useSelector } from "react-redux";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeWeapon, changeSocket } from "../state/ducks/calculator/actions";
import { getInventoryItems } from "../state/ducks/manifest/selectors";
import {
  getSelectedInventoryItem,
  getSelectedPlugItems
} from "../state/ducks/calculator/selectors";
import ItemSelect from "../components/itemSelect";
import Sockets from "../components/sockets";
import Stats from "../components/stats";
import ItemSearch from "../components/itemSearch";

const Calculator = () => {
  const dispatch = useDispatch();

  const inventoryItems = useSelector(getInventoryItems);
  const selectedInventoryItem = useSelector(getSelectedInventoryItem);
  const selectedPlugItems = useSelector(getSelectedPlugItems);

  const onItemChange = useCallback(
    weaponHash => dispatch(changeWeapon(weaponHash)),
    [dispatch]
  );
  const onSocketChange = useCallback(
    (index: number, plugItemHash: number) =>
      dispatch(changeSocket({ index, plugItemHash })),
    [dispatch]
  );

  return (
    <>
      <ItemSearch items={inventoryItems} onChange={onItemChange} />
      <ItemSelect items={inventoryItems} onChange={onItemChange} />
      {selectedInventoryItem && selectedInventoryItem.sockets && (
        <Sockets {...selectedInventoryItem.sockets} onChange={onSocketChange} />
      )}
      {selectedInventoryItem && (
        <Stats item={selectedInventoryItem} plugItems={selectedPlugItems} />
      )}
    </>
  );
};

export default Calculator;
