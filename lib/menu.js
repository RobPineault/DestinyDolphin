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
            { label: "Weapon Database", pathname: "/items/weapons" },
            { label: "Weapon Mods", pathname: "/items/weapon-mods" },
            { label: "Weapon Classes", pathname: "/items/weapon-classes" },
            { label: "Armor Database", pathname: "/items/armor" },
            { label: "Armor Mods", pathname: "/items/armor-mods" },
        ]
    },
    {
        label: "PvP",
        pathname: "/pvp",
        subMenu: [
            { label: "Crucible", pathname: "/pvp/crucible" },
            { label: "Active Modes", pathname: "/pvp/active-modes" },
            { label: "Gambit", pathname: "/pvp/gambit" },
            { label: "Trials of Osiris", pathname: "/pvp/trials-of-osiris" },
            { label: "Guides", pathname: "/pvp/guides" },
        ]
    },
    {
        label: "PvE",
        pathname: "/pve",
        subMenu: [
            { label: "Activity database", pathname: "/pve/" },
            { label: "Raids", pathname: "/pve/raids" },
            { label: "Dungeons", pathname: "/pve/dungeons" },
            { label: "Public Events", pathname: "/pve/public-events" },
        ]
    },
    {
        label: "Classes",
        pathname: "/classes",
        subMenu: [
            { label: "Hunter", pathname: "/classes/hunter" },
            { label: "Warlock", pathname: "/classes/warlock" },
            { label: "Titan", pathname: "/classes/titan" },
        ]
    },
    {
        label: "Explore",
        pathname: "/explore",
        subMenu: [
            { label: "Vendors", pathname: "/explore/vendors" },
            { label: "Lore", pathname: "/explore/lore" },
            { label: "Light Grinding", pathname: "/explore/light-grinding" },
            { label: "Season Pass", pathname: "/explore/season-pass" },
            { label: "Planets", pathname: "/explore/planets" },
            { label: "Ghost Mods", pathname: "/explore/ghost-mods" },
            { label: "Sunsetting", pathname: "/explore/sunsetting" },
            { label: "Guardian Stats", pathname: "/explore/guardian-stats" },
            { label: "Masterworking", pathname: "/explore/masterworking" },
        ]
    },

];

export default Menu;