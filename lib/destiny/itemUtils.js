
function getVaultItems(buckets, collection){
    filter(collection, (item) => {
        if (item.bucketHash) { return true}
           })
}

export function getItems(defs, equipment, sockets, characterPlugSets, profilePlugSets) {
    //itemComponents
    //let equipment = data.characterEquipment[character];
    //let sockets = data.itemComponents.sockets.data;
    //let perks = data.itemComponents.perks.data;
    //let reusablePlugs = data.itemComponents.reusablePlugs.data;
    const staticItems = defs.InventoryItem;
    const socketType = defs.SocketType;
    const socketCategory = defs.SocketCategory;
    const plugSet = defs.PlugSet;
    var playerItems = {
        currency: [],
        armor: [],
        weapon: [],
        consumable: [],
        emblem: [],
        ship: [],
        vehicle: [],
        emote: [],
        ghost: [],
        other: [],
    }
    equipment.forEach(item => {
        const staticItem = staticItems[item.itemHash];
        const instanceId = item.itemInstanceId;
        
        //const perk = perks[instanceId];
        //const plugs = reusablePlugs[instanceId];

        const instItem = {
            ...staticItem,
            instSockets: {
                intrinsic: [],
                perks: [],
                mods: [],
                cosmetics: [],
                other: [],
            }
        }
        
       // const itemReusablePlugs = reusablePlugs[instanceId].plugs
        if (staticItem.sockets) {
            const itemSockets = sockets[instanceId].sockets;
            //const reusablePlugs = reusablePlugs[instanceId].plugs;
            for (const socket of staticItem.sockets.socketCategories) {
    
                switch (socket.socketCategoryHash) {
                    case 3956125808:
                        for (const index of socket.socketIndexes) {
                            //const entry = staticItem.sockets.socketEntries[index];
                            
                            instItem.instSockets.intrinsic.push(staticItems[itemSockets[index].plugHash]);
                        }
                        break;
                    case 4241085061:
                        for (const index of socket.socketIndexes) {
                            /*
                             * 
                             * 3085181971 barrel
                             * plug set 
                             * 
                             */
                            const entry = staticItem.sockets.socketEntries[index];     


                           // const socketTypeHash = entry.socketTypeHash;
                            //const socketType = socketType[socketTypeHash];
                            //socketType.plugWhitelist.categoryHash

                            //const perkItem = staticItems[itemSockets[index].plugHash]
                            //const plugCategory = perkItem.plug.plugCategoryHash;

                            //reusablePlugs[index].forEach(plug => {
                                //plug.plugItemHash
                           // })

                            var perk = {}
                            perk.playerOptions = getPlugOptions(index, entry);
                            perk.active = staticItems[itemSockets[index].plugHash];
                            perk.allOptions = plugSet[entry.reusablePlugSetHash];
                            instItem.instSockets.perks.push(perk);
                        }
                        break;
                    case 2685412949:
                        for (const index of socket.socketIndexes) {
                            instItem.instSockets.mods.push(staticItems[itemSockets[index].plugHash]);
                        }
                        break;
                    case 2048875504:
                        for (const index of socket.socketIndexes) {
                            instItem.instSockets.cosmetics.push(staticItems[itemSockets[index].plugHash]);
                        }
                        break;
                    default:
                        for (const index of socket.socketIndexes) {
                            if (index < itemSockets.length) {
                                instItem.instSockets.other.push(staticItems[itemSockets[index].plugHash]);
                            }
                        }
                }
            }
        }

        switch (staticItem.itemType) {
            case 1:
                playerItems.currency.push(instItem);
                break;
            case 2:
                playerItems.armor.push(instItem)
                break;
            case 3: 
                playerItems.weapon.push(instItem)
                break;
            case 9:
                playerItems.consumable.push(instItem)
                break;
            case 14:
                playerItems.emblem.push(instItem)
                break;
            case 21:
                playerItems.ship.push(instItem)
                break;
            case 22:
                playerItems.vehicle.push(instItem)
                break;
            case 23:
                playerItems.emote.push(instItem)
                break;
            case 24:
                playerItems.ghost.push(instItem)
                break;
            default: 
                playerItems.other.push(instItem)
        }

        function getPlugOptions(index, entry) {
            let n = entry.plugSources;
            
            const plugOptions = [];
            if ((n - 8) > 0) {
                plugOptions.push(characterPlugSets[entry.reusablePlugSetHash || entry.randomizedPlugSetHash])
                n -= 8;
            }
            if ((n - 4) > 0) {
                profilePlugSets[entry.reusablePlugSetHash || entry.randomizedPlugSetHash].forEach(plug => {
                   plugOptions.push(staticItems[plug.plugItemHash]);
                })                
                n -= 4;
            }
            if ((n - 2) > 0) {
                plugOptions.push(itemReusablePlugs[index]);
                n -= 2;
            }
            if ((n - 1) > 0) {
                if (entry.index) {
                    itemSocketType = socketType[entry[index].socketTypeHash]
                    const SC = [];
                    itemSocketType.plugWhitelist.forEach(socketCategoryHash => {
                        //push inventory filter results for each category
                        SC.push(socketCategory[socketCategoryHash])
                    })
                    plugOptions.push(SC);
                }
            }
            return plugOptions;
        }
        
    })    
    return playerItems 
}

