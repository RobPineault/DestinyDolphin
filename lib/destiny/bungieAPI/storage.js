import { baseRequest, standardRequest } from './bungieRequests'
import { Store, set, get, del, keys, clear } from 'idb-keyval';
import { find } from 'lodash'
var dbName

const definitions = ['Activity', "ActivityGraph", "ActivityMode", "ActivityModifier", "BreakerType", "Class", "Collectible", "Checklist", "DamageType", "Destination", 'EnemyRace', "EnergyType", "Faction", "Gender",
    "InventoryBucket", "InventoryItem", "ItemCategory", "ItemTierType", "Location", "MaterialRequirementSet", "Metric", "Milestone", "Objective", "Place", "PlugSet", "PowerCap", "PresentationNode", "Progression", "Race", "Record",
    "SandboxPerk", "Season", "SeasonPass", "SocketCategory", "SocketType", "Stat", "StatGroup", "TalentGrid", "Trait", "Vendor", "VendorGroup"];

function checkForEntries() {
    let isValid = true
    return keys(dbName).then(keys => {
        definitions.forEach(def => {
            if (!keys.includes(def)) {
                isValid = false
            }
        })
        return isValid
    })
}
function checkUpdated() {
    return get("version", dbName).then(activeVersion => {
        return standardRequest('/Destiny2/Manifest/').then(res => {
            if (res.data.Response.version == activeVersion) {
                return true;
            }
            return false;
        })
    })
}
function verifyDefinitions() {
    if (window.indexedDB) {
        if (dbName == undefined) {
            dbName = new Store('Destiny-Dolphin', 'Definitions');
        }
        return checkForEntries().then(entriesFound => {
            if (entriesFound) {
                return checkUpdated().then(updated => {
                    if (updated) {
                        return
                    }
                })
            }
            clear(dbName)
            return loadDefinitions()
        })
    }
    else {
        alert("Indexed DB is not supported!");
    }
}
function cacheDefinitions(version, links) {
    set('version', version, dbName)
    const requests = definitions
        .map(async (def) => { //remove asyc
            await baseRequest('' + links['Destiny' + def + 'Definition'])
                .then(res => {
                    if (res.error) {
                        console.log(res.error)
                    }
                    set(def, res.data, dbName)
                }).catch(error => {
                    console.log(error);
                })
        })
    return Promise.all(requests)
}
function loadDefinitions() {
    return standardRequest('/Destiny2/Manifest/').then(res => {
        return cacheDefinitions(res.data.Response.version, res.data.Response.jsonWorldComponentContentPaths.en);
    })
}
export function getDefinition(definition) {
    return verifyDefinitions().then(() => {
        return get(definition, dbName);
    })    
}
export function getDefinitions(definitionList) {
    let data = []
    return verifyDefinitions().then(() => {        
        definitionList.map(definitionName => {
            data.push({[definitionName]: get(definitionName, dbName) })
        })
        return data;
    })    
}
export function loadItem(hash) {
    return verifyDefinitions().then(() => {
        return get("InventoryItem", dbName);
    }).then(items => {
        return find(items, item => item.hash == hash)
    })
}
/*
export function getDefinitionData(definition, categoryHashes) {
    let data = []
    return verifyDefinitions().then(() => {
        return get(definition, dbName);
        }).then(definition => {
            return filter(definition, (item) => {
                var arr = item.itemCategoryHashes;
                if (arr != undefined && item.itemType != 20 && item.blacklisted != true) {
                    var found = false;
                    hashes.forEach(n => {
                        if (arr.includes(n)) { found = true }
                    })
                    return found
                }
                return false;
        })


        definitionList.map(definitionName => {
            data.push({ [definitionName]: get(definitionName, dbName) })
        })
        return data;
    })
}*/