import { useEffect, useRef, useState } from 'react'
import { filter, slice } from 'lodash'
import { itemType, mods } from '../../lib/destiny/constants'
import { getDefinition } from '../../lib/destiny/bungieAPI/storage'
import { belongsToCategory, filterByType, filterArmor, filterWeapons } from '../../lib/destiny/itemUtils'
import ItemTable from '../ItemTable'
import { Card, TableContainer, Table } from '@material-ui/core';

const pageSize = 20
const ItemsDisplay = ({ filterType, state }) => {
    const [currentItems, setCurrentItems] = useState()
    const [page, setPage] = useState(1)
    const items = useRef()
    //console.log("rendered")

    useEffect(() => {
        getDefinition("InventoryItem").then(data => {
            switch (filterType) {
                case "weapon":
                    items.current = filterByType(data, itemType.Weapon)
                    setCurrentItems(items.current)
                    break;
                case "armor":
                    items.current = filterByType(data, itemType.Armor)
                    setCurrentItems(items.current)
                    break;
                case "armor mod":
                    items.current = belongsToCategory(data, mods.ArmorMods)
                    setCurrentItems(items.current)
                    break;
            }            
        })
    }, [])

    useEffect(() => {
        if (typeof items.current != "undefined") {
            switch (filterType) {
                case "weapons":
                    setCurrentItems(filterWeapons(state, items.current))
                    break;
                case "armor":
                    setCurrentItems(filterArmor(state, items.current))
                    break;
                case "armor-mod":
                    //setCurrentItems(filterWeapons(state, items.current))
                    break;
            }  
            
        }
    }, [state])

    function getNumResults() {
        if (typeof currentItems != "undefined") {
            return currentItems.length
        }
        else {
            return 0
        }
    }
    function getDisplayItems() {
        return slice(currentItems, (page - 1) * pageSize, page * pageSize);
    }
    return (
        <>
            <TableContainer component={Card}>
                <Table className="item-table" aria-label="simple table" padding="default">
                    <ItemTable items={getDisplayItems()} itemType={filterType} />
                   </Table>
            </TableContainer>
        </>
    )
}
//
export default ItemsDisplay


