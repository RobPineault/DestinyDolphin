import { getDefinitions } from './bungieAPI/definitions'
import { filter, find, slice } from "lodash"

//var Destination;
//var Location;
var Activity;
//var ActivityMode;
var Checklist;
var adventures;
var lostSectors;
var raids;
var strikes;
var currentSet;
var baseSet;
var pageSize = 20;
var currentBase;
export function getCurrentItems(page) {
    var start = (page - 1) * pageSize
    var end = page * pageSize
    return slice(currentSet, start, end);
}

export function resetFilters() {
    baseSet.length = 0;
    baseSet = baseSet.concat(activities, lostSectors, raids, strikes);
    currentBase = [1, 2, 3, 4];
}
export function filterPve(config) {
    const base = config[0].hashes;
    if (JSON.stringify(base) != JSON.stringify(currentBase)) {
        currentBase.length = 0;
        currentBase = [...base];
        baseSet.length = 0;
        
        if (base.length == 0) {
            baseSet = baseSet.concat(adventures, lostSectors, raids, strikes);

        }
        else {
            if (base.includes(1)) { baseSet = baseSet.concat(adventures) };
            if (base.includes(2)) { baseSet = baseSet.concat(strikes) };
            if (base.includes(3)) { baseSet = baseSet.concat(raids) };
            if (base.includes(4)) { baseSet = baseSet.concat(lostSectors) };            
        }
    }
    
    if (config[1].hashes.length == 0) { // no filters
        currentSet = baseSet;
        console.log(currentSet);
        return currentSet;
    }
    let results = filter(baseSet, item => {
        let itemAttributes = [item.destinationHash];
        let found = false;
            config[1].hashes.forEach(hash => {
                if (itemAttributes.includes(hash)) { found = true }
            })
        
        return found;
    })
    currentSet = results;
    console.log(currentSet);
    return currentSet;
    
}
export function getCurrentSetSize() {
    return currentSet.length;
}
export function initFilter() {
    return getDefinitions().then(definitions => {
        Checklist = definitions.Checklist;
        //Destination = definitions.Destination;
        //Location = definitions.Location;
        Activity = definitions.Activity;
        //ActivityMode = definitions.ActivityMode;
        adventures = find(Checklist, (item) => item.hash == 4178338182);
        adventures = adventures.entries;
        lostSectors = find(Checklist, (item) => item.hash == 3142056444);
        lostSectors = lostSectors.entries;
        raids = getAllRaids();
        strikes = getAllStrikes();
        baseSet = [];
        baseSet = baseSet.concat( adventures, lostSectors, raids, strikes );
        currentSet = baseSet;
        currentBase = [1, 2, 3, 4];
        console.log(baseSet);
    })
}
function getAllStrikes() {
    return filter(Activity, (activity) => {
        if (activity.activityModeHashes) {
            if (activity.activityModeHashes.includes(2394616003)) {
                return true
            }
        }
        return false
    })
}
function getAllRaids() {
    return filter(Activity, (activity) => {
        if (activity.activityModeHashes) {
            if (activity.activityModeHashes.includes(2043403989)) {
                return true
            }
        }
        return false
    })
}