import { filterByType, belongsToCategory } from '../itemUtils'
import { itemType, mods } from '../constants'
import { requestDefinition } from './commonRequests'

var items
let fetchCount = 0;
function setItems() {
    return requestDefinition("InventoryItem").then(data => {
        console.log("request made")
        items = data
    })
}
function format(items) {
    return items.map(item => {
        return {
            hash: item.hash.toString(),
            name: item.displayProperties.name.replace(/\s/g, '')            
        }
    })
}
export async function fetchItemData(type) {
    if (!items) {
        await setItems()
        fetchCount++
    }
    console.log(fetchCount)
    switch (type) {
        case "weapon": 
            return format(filterByType(items, itemType.Weapon))
        case "armor":
            return format(filterByType(items, itemType.Armor))
        case "mod":
            return format(belongsToCategory(items, mods.ArmorMods))            
    }      
}
