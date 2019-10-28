import { useSelector } from "react-redux";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeWeapon, changeSocket } from "../state/ducks/calculator/actions";
import { getInventoryItems } from "../state/ducks/manifest/selectors";
import {
  getSelectedInventoryItem,
  getSelectedPlugItems
} from "../state/ducks/calculator/selectors";
import Sockets from "../components/sockets";
import Stats from "../components/stats";
import ItemSearch from "../components/itemSearch";
import Item from "../components/item";

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
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto auto"
      }}
    >
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <ItemSearch items={inventoryItems} onChange={onItemChange} />
        </div>
        {selectedInventoryItem && <Item item={selectedInventoryItem} />}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "auto auto" // gridTemplateColumns on desktop
        }}
      >
        <div>
          {selectedInventoryItem && selectedInventoryItem.sockets && (
            <Sockets
              {...selectedInventoryItem.sockets}
              onChange={onSocketChange}
            />
          )}
        </div>
        <div>
          {selectedInventoryItem && (
            <Stats item={selectedInventoryItem} plugItems={selectedPlugItems} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
