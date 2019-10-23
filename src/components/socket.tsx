import React from "react";
import { ISocketEntry } from "../state/ducks/manifest/types";

type Props = {
  socket: ISocketEntry;
  onChange: (plugItemHash: number) => void;
};

const Socket: React.FC<Props> = ({ socket, onChange }: Props) => {
  const plugItems = (() => {
    const plugSet = socket.randomizedPlugSet || socket.reusablePlugSet;

    if (plugSet) {
      return plugSet.reusablePlugItems;
    } else if (
      socket.singleInitialItem &&
      socket.reusablePlugItems.length > 0
    ) {
      return socket.reusablePlugItems.some(
        // Use the name not the hash because dummy masterwork items have different hashes
        plugItem =>
          plugItem.displayProperties.name ===
          socket.singleInitialItem!.displayProperties.name
      )
        ? socket.reusablePlugItems
        : [socket.singleInitialItem, ...socket.reusablePlugItems];
    } else if (socket.reusablePlugItems.length > 0) {
      return socket.reusablePlugItems;
    } else {
      return [socket.singleInitialItem!];
    }
  })();

  return (
    <select
      defaultValue={
        socket.singleInitialItem && socket.singleInitialItem.hash.toString()
      }
      onChange={e => onChange(parseInt(e.target.value, 10))}
    >
      {plugItems.map(item => (
        <option key={item.hash} value={item.hash}>
          {item.displayProperties.name}
        </option>
      ))}
    </select>
  );
};

export default Socket;
