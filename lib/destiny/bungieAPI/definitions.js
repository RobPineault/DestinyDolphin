import axios from 'axios';
import { Store, set, get, del } from 'idb-keyval';
var dbName = null;
const definitions = ['Activity', "ActivityGraph", "ActivityMode", "ActivityModifier", "BreakerType", "Class", "Collectible", "Checklist", "DamageType", "Destination", 'EnemyRace', "EnergyType", "Faction", "Gender",
    "InventoryBucket", "InventoryItem", "ItemCategory", "ItemTierType", "Location", "MaterialRequirementSet", "Metric", "Milestone", "Objective", "Place", "PlugSet", "PowerCap", "PresentationNode", "Progression", "Race", "Record",
    "SandboxPerk", "Season", "SeasonPass", "SocketCategory", "SocketType", "Stat", "StatGroup", "TalentGrid", "Trait", "Vendor", "VendorGroup"];



export function checkForDefinitions() {
    return get('destinyDefinitions', dbName)
            .then(val => {
                if (val === undefined) {
                    return false
                }
                return true
            })
            .catch(err =>{ return false })
}

function getDefinitionLinks() {
    return new Promise(
        function (resolve, reject) {
            axios.get('https://www.bungie.net/Platform/Destiny2/Manifest/', { headers: { 'X-API-KEY': '69bca91d818846da8aa22f7026df3dae' } })
                .then(res => {
                    resolve({ version: res.data.Response.version, links: res.data.Response.jsonWorldComponentContentPaths.en });
                })
                .catch(function (error) {
                    reject(error);
                })
        }); 
} 
function cacheDefinitions(links) {    
    return new Promise(
        function (resolve, reject) {
            const definitionReq = axios.create({
                method: 'get',
                baseURL: 'https://www.bungie.net/'
            });           
            let db = { version: links.version }
            const requests = definitions
                .map( async (def) => {                    
                    await definitionReq('' + links.links['Destiny' + def + 'Definition'])
                        .then( res => {                            
                            db[def] = res.data;                            
                        })
                })
           Promise.all( requests )
               .then(function () {
                   set('destinyDefinitions', db, dbName)
                   resolve("definitions loaded")
                })
                .catch(function (error) {
                    reject(error);
                })
        }); 
}
 function loadDefinitions() {
    return new Promise(
        function (resolve, reject) {
            getDefinitionLinks()
                .then(function (links) {
                    return cacheDefinitions(links);
                })
                .then(res => {
                    resolve(res)
                }
                )
                .catch(err => reject(err))
        })
}
function checkForUpdate(version) {
    return getDefinitionLinks().then(links => {
        if (links.version == version) {
            return true;
        }
        return false;
    })
}
export async function getDefinitions() {    
    if (window.indexedDB) {        
        if (dbName === null) {
            dbName = new Store('Destiny-Dolphin', 'Definitions');
        }
            var db = await searchIdb();
            console.log("heloo")
            if (db) {
                let upToDate = await checkForUpdate(db.version);
                console.log(upToDate)
                if (upToDate) {
                    return db
                }
                else {
                    del('destinyDefinitions', dbName);
                }
            }
            await loadDefinitions();
            return await searchIdb();
    }
    else {
        alert("Indexed DB is not supported!");
    }     
}
export function getItems() {
    return getDefinitions().then(definitions => {
        return definitions.InventoryItem;
    })    
}
// def found false not found
function searchIdb() {        
        return get('destinyDefinitions', dbName)
            .then(defs => {
                if (!defs) {
                    del('destinyDefinitions', dbName)
                    return false
                }
                return defs
            }).catch(e => {
                return false
            })
}