import React from "react";
import Sockets from "../components/sockets";
import Stats from "../components/stats";
import ItemSearch from "../components/itemSearch";
import Item from "../components/item";
import { IInventoryItem } from "../state/ducks/manifest/types";
import styles from "./calculator.module.css";

type Props = {
  inventoryItems: IInventoryItem[];
  selectedInventoryItem?: IInventoryItem;
  selectedPlugItems: (IInventoryItem | undefined)[];
  onItemChange: (itemHash: number) => void;
  onSocketChange: (index: number, plugItemHash: number) => void;
};

const Calculator: React.FC<Props> = ({
  inventoryItems,
  selectedInventoryItem,
  selectedPlugItems,
  onItemChange,
  onSocketChange
}) => {
  return (
    <div className={styles.calculator}>
      <div className={styles.search}>
        <ItemSearch items={inventoryItems} onChange={onItemChange} />
      </div>
      <div className={styles.item}>
        {selectedInventoryItem && <Item item={selectedInventoryItem} />}
      </div>
      <div className={styles.sockets}>
        {selectedInventoryItem && selectedInventoryItem.sockets && (
          <Sockets
            plugItems={selectedPlugItems}
            {...selectedInventoryItem.sockets}
            onChange={onSocketChange}
          />
        )}
      </div>
      <div className={styles.stats}>
        {selectedInventoryItem && (
          <Stats item={selectedInventoryItem} plugItems={selectedPlugItems} />
        )}
      </div>
    </div>
  );
};

export default Calculator;
