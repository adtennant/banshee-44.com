import React, { useState } from "react";
import { IStat, ISocketEntry } from "../state/ducks/manifest/types";

type Props = {
  socket: ISocketEntry;
  onChange: (plugItemHash: number) => void;
};

const Masterwork: React.FC<Props> = ({ socket, onChange }) => {
  const [statHash, setStatHash] = useState(
    socket.singleInitialItem &&
      socket.singleInitialItem.investmentStats[0].stat.hash
  );

  const stats = socket.reusablePlugSet!.reusablePlugItems.reduce(
    (stats, plugItem) =>
      stats.set(
        plugItem.investmentStats[0].stat.hash,
        plugItem.investmentStats[0].stat
      ),
    new Map<number, IStat>()
  );

  const plugItems = socket.reusablePlugSet!.reusablePlugItems.filter(
    plugItem => plugItem.investmentStats[0].stat.hash === statHash
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
          setStatHash(newStatHash);

          const plugItem = socket.reusablePlugSet!.reusablePlugItems.filter(
            plugItem => plugItem.investmentStats[0].stat.hash === newStatHash
          )[0];

          onChange(plugItem.hash);
        }}
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
