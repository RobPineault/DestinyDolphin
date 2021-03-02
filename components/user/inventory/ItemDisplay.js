import { useEffect, useRef, useState } from 'react'
import { filter, slice } from 'lodash'
import { itemType, mods } from '../../../lib/destiny/constants'
import { getDefinition } from '../../../lib/destiny/bungieAPI/storage'
import { belongsToCategory, filterByType, filterArmor, filterWeapons } from '../../../lib/destiny/itemUtils'
import ItemTable from '../../ItemTable'
import { Card, TableContainer, Table, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

const pageSize = 20
const ItemsDisplay = ({inventory, state }) => {
    const activeCharacterId = useSelector(state => state.user.activeProfile.characters.activeCharacterId)
    /*
    const { activeCharacterId, characterIds } = useSelector(
        (state) => {
            return {
                activeCharacterId: state.user.activeProfile.characters.activeCharacterId,
                characterIds: state.user.activeProfile.profile.data.characterIds,
            }
        },
        shallowEqual
    )*/

    const [currentItems, setCurrentItems] = useState()
    const [page, setPage] = useState(1)
    const staticItems = useRef()
    //console.log("rendered")

    useEffect(() => {
        getDefinition("InventoryItem").then(data => {
           staticItems.current = data
            combineItemData();
        })
    }, [])
    
    function combineItemData() {
        setCurrentItems(combine(inventory.characterEquipment.data[activeCharacterId].items))
    }
    function combine(instItems) {
        return instItems.map(item => {
            const staticItem = staticItems.current[item.itemHash];
            staticItem.inst = item
            return staticItem
        })
    }
    useEffect(() => {
        if (typeof staticItems.current != "undefined") {
            //setCurrentItems(filterItems(state, items.current))
            console.log("filtering items")
            combineItemData();
        }
    }, [state, activeCharacterId])

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
                    <ItemTable items={getDisplayItems()} itemType={null} />
                </Table>
            </TableContainer>
        </>
    )
}
//
export default ItemsDisplay


