const Menu = [
    {
        label: "Home",
        pathname: "/",
        subMenu: null,
    },
    {
        label: "Items",
        pathname: "/items/weapons",
        subMenu: [
            { label: "Weapon Database", pathname: "/items/weapons", active: true },
            { label: "Weapon Mods", pathname: "/items/weapon-mods", active: false },
            { label: "Weapon Classes", pathname: "/items/weapon-classes", active: false },
            { label: "Armor Database", pathname: "/items/armor", active: true },
            { label: "Armor Mods", pathname: "/items/armor-mods", active: false },
        ]
    },
    {
        label: "PvP",
        pathname: "/pvp",
        subMenu: [
            { label: "Crucible", pathname: "/pvp/crucible", active: false },
            { label: "Active Modes", pathname: "/pvp/active-modes", active: false },
            { label: "Gambit", pathname: "/pvp/gambit" },
            { label: "Trials of Osiris", pathname: "/pvp/trials-of-osiris", active: false },
            { label: "Guides", pathname: "/pvp/guides", active: false },
        ]
    },
    {
        label: "PvE",
        pathname: "/pve",
        subMenu: [
            { label: "Activity database", pathname: "/pve/", active: false },
            { label: "Raids", pathname: "/pve/raids", active: false },
            { label: "Dungeons", pathname: "/pve/dungeons", active: false },
            { label: "Public Events", pathname: "/pve/public-events", active: false },
        ]
    },
    {
        label: "Classes",
        pathname: "/classes",
        subMenu: [
            { label: "Hunter", pathname: "/classes/hunter", active: false },
            { label: "Warlock", pathname: "/classes/warlock", active: false },
            { label: "Titan", pathname: "/classes/titan", active: false },
        ]
    },
    {
        label: "Explore",
        pathname: "/explore",
        subMenu: [
            { label: "Vendors", pathname: "/explore/vendors", active: false },
            { label: "Lore", pathname: "/explore/lore", active: false },
            { label: "Light Grinding", pathname: "/explore/light-grinding", active: false },
            { label: "Season Pass", pathname: "/explore/season-pass", active: false },
            { label: "Planets", pathname: "/explore/planets", active: false },
            { label: "Ghost Mods", pathname: "/explore/ghost-mods", active: false },
            { label: "Sunsetting", pathname: "/explore/sunsetting", active: false },
            { label: "Guardian Stats", pathname: "/explore/guardian-stats", active: false },
            { label: "Masterworking", pathname: "/explore/masterworking", active: false },
        ]
    },
];

export default Menu;