export interface UserConfig {
    characters: Array<Character>,
    membership: Membership,
}
interface Character {
    characterId: number,
    class: DestinyClass,
    emblem: Emblem,
    gender: DestinyGender,
    light: number,
    race: DestinyRace,
    stats: Array<CharacterStat>,
}

export interface Membership {
    displayName: string,
    isPublic: boolean,
    lastPlayed: string,
    membershipId: number,
    membershipType: number,
}
export class InventoryItem {
    hash: string;
    name: string;
    description: string;
    icon: string;
    equippable: boolean;
    equipped: boolean;
    bucketTypeHash: string;
    tier: any; //tbdefined
    investmentStats: any;
    type: any; //tbdefined
    perks: any; //tbdefined
    sockets: any; //tbdefined
    stats: any; //tbdefined
    constructor(hash: string,
        name: string,
        description: string,
        icon: string,
        equippable: boolean,
        equipped: boolean,
        bucketTypeHash: string,
        tier: any, 
        investmentStats: any,
        type: any,
        perks: any, 
        sockets: any,
        stats: any) {
        this.hash = hash;
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.equippable = equippable;
        this.equipped = equipped;
        this.bucketTypeHash = bucketTypeHash;
        this.tier = tier;
        this.investmentStats = investmentStats;
        this.type = type;
        this.perks = perks; 
        this.sockets = sockets;
        this.stats = stats;
    } 
}

interface CharacterStat {
    hash: number,
    value: number,
}
enum DestinyClass {
    Titan = 0,
    Hunter,
    Warlock,
    Unknown, 
}
enum DestinyGender {
    Male = 0,
    Female,
    Unknown,
}
enum DestinyRace {
    Human = 0,
    Awoken,
    Exo,
    Unknown,
}

interface Emblem {
    emblemBackgroundPath: string,
    emblemColor: color,
    emblemHash: number,
    emblemPath: string,
}
interface color {
    red: number,
    green: number,
    blue: number,
    alpha?: number,
}




