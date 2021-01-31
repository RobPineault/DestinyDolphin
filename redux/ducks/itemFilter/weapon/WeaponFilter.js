import WeaponFilterGroup from './WeaponFilterGroup'
import { toggleWeaponSlot, searchWeapons, weaponSlotCategory } from './weaponFiltersSlice'
import { useSelector } from 'react-redux'

const WeaponFilter = () => {
    const { slot } = useSelector(state => state.itemFilters.weaponFilter)
    return (
        <div>
            <span>Slot</span>
            <WeaponFilterGroup
                activeFilters={Slot}
            >
            </WeaponFilterGroup>
            <WeaponFilterButton toggleFilter={toggleWeaponSlot} filter={weaponSlotCategory.kinetic} active={slot.includes(weaponSlotCategory.kinetic)}>Kinetic</WeaponFilterButton>
            <WeaponFilterButton toggleFilter={toggleWeaponSlot} filter={weaponSlotCategory.energy}>Energy</WeaponFilterButton>
            <WeaponFilterButton toggleFilter={toggleWeaponSlot} filter={weaponSlotCategory.power}>Power</WeaponFilterButton>
        </div>
    )
}

export default WeaponFilter