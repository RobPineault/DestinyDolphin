import { getDefinitions } from './bungieAPI/definitions'
import { filter, find, slice } from "lodash"

var Destination;
var Location;
var Activity;
var ActivityGraph;
var ActivityMode;
var Checklist;
export function destinationTest() {
    getDefinitions().then(definitions => {
        Destination = definitions.Destination;
        Location = definitions.Location;
        Activity = definitions.Activity;
        ActivityGraph = definitions.ActivityGraph;
        ActivityMode = definitions.ActivityMode;
        Checklist = definitions.Checklist;
        adventures = Checklist[-116629114];
        lostSectors = Checklist[-1152910852];
        regionalChest = Checklist[1697465175];
        strikes = filterActivities(2394616003);
        const earthLocations = filterDestination(1199524104);
        const data = earthLocations.map(location => {
            location = location.locationReleases[0];
            if (location.activityHash != 0) {
                var activity = getActivity(location.activityHash);
            }
            
            if (activity) {
                var activityMode = getActivityMode(activity.activityModeHashes);
            }
            const o = {
                destination: getLocationName(location.activityBubbleName),
                activity: activity ? activity : null,
                activityMode: activityMode ? activityMode : null,
                position: location.worldPosition,
                graph: getActivityGraph(location.activityGraphHash)
            }
            return o
        })
        console.log(data);
    })
}

function filterDestination(hash) {
    let i = 0;
    let j = 0;
    const result = filter(Location, (location) => {

        const arr = location.locationReleases;

        if (arr != undefined) {
            if (arr.length == 1) {
                if (arr[0].destinationHash == hash) {
                    return true;
                }
            }
            i++            
        }
        j++        
        return false;
    })
    //console.log("more than 1 location release " + i);
    //console.log("no location release " + j);
    return result;
}
function getLocationName(hash) {
    let earth = Destination[1199524104];
    let bubble = find(earth.bubbles, (bubble) => { return(bubble.hash == hash) })
    if (bubble) {
        return bubble.displayProperties.name;
    }   
}
/*
 * pve
name
description
image
enemy type?

weapon

stats
perks
usage/
*/



function getActivity(hash) {
    const id = hash >> 32;
    let activity = Activity[id];
    console.log(activity);
    return activity;
}
function getActivityGraph(hash) {
    const id = hash >> 32;
    return ActivityGraph[id];
}
function getActivityMode(activityModeHashes) {
    let activityModes = [];
    activityModeHashes.forEach(hash => {
        let id = hash >> 32;
        let activityMode = ActivityMode[id];
        if (activityMode) {
            activityModes.push({
                displayProperties: activityMode.displayProperties,
            })
        }
        else { console.log(id) }
    })
    return activityModes
}
/*
 * strikes: 2394616003 * 
 * normal strike: 4110605575
 * nightfall: 3789021730
 * scored pristege nightfall: 532484583
 * scored nightfall: 547513715
 * pristege nightfall: 1350109474
 * raid: 2043403989
 * pve: 1164760493
 * 
export default class Index {
    constructor(filterType) {
        this.type = filterType;
        this.definitions = [];
        this.currentItems = [];
        this.baseItems = [];
        this.pageSize = 30;
    }
    async init() {
        this.definitions = await getDefinitions();
        this.baseItems = this.baseQuery(this.type);
        this.currentItems = this.baseItems;
    }
    baseQuery(filterType) {
        switch (filterType) {
            case 'weapon':
                return this.multiFilterAllItems([2, 3, 4]);
                break;
            case 'armor':
                return this.multiFilterAllItems([45, 46, 47, 48, 49]);
                break;
            case 'armor mod':
                return this.multiFilterAllItems([4104513227]);
                break;
        }
    }
}

 earth 1199524104

  */