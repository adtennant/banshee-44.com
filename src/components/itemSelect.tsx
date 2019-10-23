import React from "react";
import { IInventoryItem } from "../state/ducks/manifest/types";

type Props = {
  items: IInventoryItem[];
  onChange: (itemHash: number) => void;
};

const ItemSelect: React.FC<Props> = ({ items, onChange }: Props) => {
  return (
    <select
      defaultValue=""
      onChange={e => onChange(parseInt(e.target.value, 10))}
    >
      <option disabled hidden value=""></option>
      {items
        .filter(item => item.itemCategoryHashes.includes(1))
        .sort((a, b) =>
          a.displayProperties.name.localeCompare(b.displayProperties.name)
        )
        .map(item => (
          <option key={item.hash} value={item.hash}>
            {item.displayProperties.name}
          </option>
        ))}
    </select>
  );
};

export default ItemSelect;
