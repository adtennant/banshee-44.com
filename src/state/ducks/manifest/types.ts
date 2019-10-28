export enum ItemType {
  None = 0,
  Currency = 1,
  Armor = 2,
  Weapon = 3,
  Message = 7,
  Engram = 8,
  Consumable = 9,
  ExchangeMaterial = 10,
  MissionReward = 11,
  QuestStep = 12,
  QuestStepComplete = 13,
  Emblem = 14,
  Quest = 15,
  Subclass = 16,
  ClanBanner = 17,
  Aura = 18,
  Mod = 19,
  Dummy = 20,
  Ship = 21,
  Vehicle = 22,
  Emote = 23,
  Ghost = 24,
  Package = 25,
  Bounty = 26,
  Wrapper = 27,
  SeasonalArtifact = 28
}

export enum ItemSubType {
  None = 0,
  Crucible = 1, // DEPRECATED. Items can be both "Crucible" and something else interesting.
  Vanguard = 2, // DEPRECATED. An item can both be "Vanguard" and something else.
  Exotic = 5, // DEPRECATED. An item can both be Exotic and something else.
  AutoRifle = 6,
  Shotgun = 7,
  Machinegun = 8,
  HandCannon = 9,
  RocketLauncher = 10,
  FusionRifle = 11,
  SniperRifle = 12,
  PulseRifle = 13,
  ScoutRifle = 14,
  Crm = 16, // DEPRECATED. An item can both be CRM and something else.
  Sidearm = 17,
  Sword = 18,
  Mask = 19,
  Shader = 20,
  Ornament = 21,
  FusionRifleLine = 22,
  GrenadeLauncher = 23,
  SubmachineGun = 24,
  TraceRifle = 25,
  HelmetArmor = 26,
  GauntletsArmor = 27,
  ChestArmor = 28,
  LegArmor = 29,
  ClassArmor = 30,
  Bow = 31
}

export interface ISocketEntryRaw {
  socketTypeHash: number;
  singleInitialItemHash: number;
  reusablePlugItems: {
    plugItemHash: number;
  }[];
  randomizedPlugSetHash?: number;
  reusablePlugSetHash?: number;
}

export interface IInventoryItemRaw {
  displayProperties: {
    description: string;
    name: string;
    icon: string;
  };
  itemTypeDisplayName?: string;
  stats?: {
    statGroupHash: number;
  };
  sockets?: {
    socketEntries: {
      socketTypeHash: number;
      singleInitialItemHash: number;
      reusablePlugItems: {
        plugItemHash: number;
      }[];
      randomizedPlugSetHash?: number;
      reusablePlugSetHash?: number;
    }[];
    socketCategories: {
      socketCategoryHash: number;
      socketIndexes: number[];
    }[];
  };
  investmentStats: {
    statTypeHash: number;
    value: number;
  }[];
  itemCategoryHashes: number[];
  itemType: ItemType;
  itemSubType: ItemSubType;
  hash: number;
}

export interface IManifestRaw {
  version: string;
}

export interface IPlugSetRaw {
  reusablePlugItems: {
    plugItemHash: number;
  }[];
  hash: number;
}

export interface ISocketCategoryRaw {
  displayProperties: {
    description: string;
    name: string;
  };
  hash: number;
  index: number;
}

export interface IStatRaw {
  displayProperties: {
    description: string;
    name: string;
  };
  hash: number;
}

export interface IStatGroupRaw {
  scaledStats: {
    statHash: number;
    displayAsNumeric: boolean;
    displayInterpolation: {
      value: number;
      weight: number;
    }[];
  }[];
  hash: number;
}

export interface IDisplayProperties {
  description: string;
  name: string;
  icon?: string;
}

export interface IStat {
  displayProperties: IDisplayProperties;
  hash: number;
}

export interface IDisplayInterpolation {
  value: number;
  weight: number;
}

export interface IStatGroup {
  scaledStats: {
    stat: IStat;
    displayAsNumeric: boolean;
    displayInterpolation: IDisplayInterpolation[];
  }[];
  hash: number;
}

export interface IPlugSet {
  reusablePlugItems: IInventoryItem[];
  hash: number;
}

export interface ISocketEntry {
  socketTypeHash: number;
  singleInitialItem?: IInventoryItem;
  reusablePlugItems: IInventoryItem[];
  randomizedPlugSet?: IPlugSet;
  reusablePlugSet?: IPlugSet;
}

export interface ISocketCategory {
  displayProperties: IDisplayProperties;
  hash: number;
  index: number;
}

export interface IStat {
  displayProperties: IDisplayProperties;
  hash: number;
}

export interface IInvestmentStat {
  stat: IStat;
  value: number;
}

export interface IInventoryItem {
  displayProperties: IDisplayProperties;
  itemTypeDisplayName?: string;
  stats?: {
    statGroup: IStatGroup;
  };
  sockets?: {
    socketEntries: ISocketEntry[];
    socketCategories: {
      socketCategory: ISocketCategory;
      socketIndexes: number[];
    }[];
  };
  investmentStats: IInvestmentStat[];
  itemCategoryHashes: number[];
  itemType: ItemType;
  itemSubType: ItemSubType;
  hash: number;
}
