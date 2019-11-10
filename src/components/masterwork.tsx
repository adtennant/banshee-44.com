import React from "react";
import {
  IStat,
  ISocketEntry,
  IInventoryItem
} from "../state/ducks/manifest/types";

type Props = {
  socket: ISocketEntry;
  onChange: (plugItemHash: number) => void;
  value: IInventoryItem;
};

const Masterwork: React.FC<Props> = ({ socket, onChange, value }) => {
  const stats = socket.reusablePlugSet!.reusablePlugItems.reduce(
    (stats, plugItem) =>
      stats.set(
        plugItem.investmentStats[0].stat.hash,
        plugItem.investmentStats[0].stat
      ),
    new Map<number, IStat>()
  );

  const plugItems = socket.reusablePlugSet!.reusablePlugItems.filter(
    plugItem =>
      plugItem.investmentStats[0].stat.hash ===
      value.investmentStats[0].stat.hash
  );

  return (
    <>
      <select
        defaultValue={
          socket.singleInitialItem &&
          socket.singleInitialItem.investmentStats[0].stat.hash.toString()
        }
        onChange={e => {
          const newStatHash = parseInt(e.target.value, 10);

          const plugItem = socket.reusablePlugSet!.reusablePlugItems.filter(
            plugItem => plugItem.investmentStats[0].stat.hash === newStatHash
          )[0];

          onChange(plugItem.hash);
        }}
        value={value.investmentStats[0].stat.hash}
      >
        {Array.from(stats.values()).map(stat => (
          <option key={stat.hash} value={stat.hash}>
            {stat.displayProperties.name}
          </option>
        ))}
      </select>
      <select
        defaultValue={
          socket.singleInitialItem && socket.singleInitialItem.hash.toString()
        }
        onChange={e => onChange(parseInt(e.target.value, 10))}
        value={value.hash}
      >
        {plugItems.map(plugItem => (
          <option key={plugItem.hash} value={plugItem.hash}>
            {plugItem.displayProperties.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Masterwork;
