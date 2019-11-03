import React from "react";
import {
  IInventoryItem,
  IDisplayInterpolation
} from "../state/ducks/manifest/types";

/*const excludedStats: { [key in keyof typeof ItemType]?: number[] } = {
  [ItemSubType.Sword]: [3555269338] // Zoom
};

const hiddenStats: IScaledStat[] = [
  {
    hash: 1345609583, // Aim Assistance
    displayAsNumeric: false,
    displayInterpolation: []
  },
  {
    hash: 2715839340, // Recoil Direction
    displayAsNumeric: false,
    displayInterpolation: []
  },
  {
    hash: 3555269338, // Zoom
    displayAsNumeric: false,
    displayInterpolation: []
  }
];*/

type Props = {
  item: IInventoryItem;
  plugItems: (IInventoryItem | undefined)[];
};

const round = (n: number, d: number = 0) => {
  var x = n * Math.pow(10, d);
  var r = Math.round(x);
  var br = (x > 0 ? x : -x) % 1 === 0.5 ? (0 === r % 2 ? r : r - 1) : r;
  return br / Math.pow(10, d);
};

const interpolate = (
  investmentValue: number,
  displayInterpolation: IDisplayInterpolation[]
) => {
  const interpolation = [...displayInterpolation].sort(
    (a, b) => a.value - b.value
  );

  const upperBound = interpolation.find(
    point => point.value >= investmentValue
  );
  const lowerBound = [...interpolation]
    .reverse()
    .find(point => point.value <= investmentValue);

  if (!upperBound && !lowerBound) {
    throw new Error("Invalid displayInterpolation");
  }

  if (!upperBound || !lowerBound) {
    if (upperBound) {
      return upperBound.weight;
    } else if (lowerBound) {
      return lowerBound.weight;
    } else {
      throw new Error("Invalid displayInterpolation");
    }
  }

  const range = upperBound.value - lowerBound.value;
  const t =
    range > 0
      ? (investmentValue - lowerBound.value) /
        (upperBound.value - lowerBound.value)
      : 1;

  const displayValue =
    lowerBound.weight + t * (upperBound.weight - lowerBound.weight);
  return round(displayValue);
};

const Stats: React.FC<Props> = ({ item, plugItems }) => {
  const totalInvestmentStats = [
    ...item.investmentStats,
    ...plugItems
      .filter(plugItem => !!plugItem)
      .flatMap(plugItem => plugItem!.investmentStats)
  ].reduce(
    (stats, stat) =>
      stats.set(stat.stat.hash, (stats.get(stat.stat.hash) || 0) + stat.value),
    new Map<number, number>()
  );

  const displayStats = item.stats!.statGroup.scaledStats.map(stat => {
    const investmentValue = totalInvestmentStats.get(stat.stat.hash);

    return {
      stat: stat.stat,
      displayAsNumeric: stat.displayAsNumeric,
      value: interpolate(investmentValue!, stat.displayInterpolation)
    };
  });

  return (
    <ul>
      {displayStats
        .filter(stat => !stat.displayAsNumeric)
        .map(stat => (
          <li key={stat.stat.hash}>
            {stat.stat.displayProperties.name} - {stat.value}
          </li>
        ))}
      {displayStats
        .filter(stat => stat.displayAsNumeric)
        .map(stat => (
          <li key={stat.stat.hash}>
            {stat.stat.displayProperties.name} - {stat.value}
          </li>
        ))}
    </ul>
  );
};

export default Stats;
