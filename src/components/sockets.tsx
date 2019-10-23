import React from "react";
import { ISocketEntry } from "../state/ducks/manifest/types";
import Masterwork from "../components/masterwork";
import Socket from "../components/socket";
import { ISocketCategory } from "../state/ducks/manifest/types";

type Props = {
  socketEntries: ISocketEntry[];
  socketCategories: {
    socketCategory: ISocketCategory;
    socketIndexes: number[];
  }[];
  onChange: (index: number, plugItemHash: number) => void;
};

const Sockets: React.FC<Props> = ({
  socketEntries,
  socketCategories,
  onChange
}: Props) => {
  return (
    <>
      {socketCategories
        .sort((a, b) => a.socketCategory.index - b.socketCategory.index)
        .map(socketCategory => (
          <div key={socketCategory.socketCategory.hash}>
            <h1>{socketCategory.socketCategory.displayProperties.name}</h1>
            {socketCategory.socketIndexes.map(socketIndex => {
              const socket = socketEntries[socketIndex];

              if (
                !socket.singleInitialItem &&
                !socket.reusablePlugSet &&
                !socket.randomizedPlugSet
              ) {
                // Invalid Sockets
                return <React.Fragment key={socketIndex}></React.Fragment>;
              }

              if (
                socket.socketTypeHash === 1282012138 || // Y2 Masterwork Trackers
                (socket.reusablePlugSet &&
                  socket.reusablePlugSet.hash === 144918107) // Y1 Masterwork Trackers
              ) {
                return <React.Fragment key={socketIndex}></React.Fragment>;
              }

              if (
                socket.reusablePlugSet &&
                socket.reusablePlugSet.hash === 1117738936
              ) {
                // Y2 Masterworks
                return (
                  <Masterwork
                    key={socketIndex}
                    socket={socket}
                    onChange={hash => onChange(socketIndex, hash)}
                  />
                );
              } else {
                return (
                  <Socket
                    key={socketIndex}
                    socket={socket}
                    onChange={hash => onChange(socketIndex, hash)}
                  />
                );
              }
            })}
          </div>
        ))}
    </>
  );
};

export default Sockets;
