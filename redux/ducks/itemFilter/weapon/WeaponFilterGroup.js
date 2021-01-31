import WeaponFilterButton from './WeaponFilterButton'
const WeaponFilter = ({ activeFilters }) => {    
    return (
        <div>
            <span>Slot</span>
            <WeaponFilterButton toggleFilter={toggleWeaponSlot} filter={weaponSlotCategory.kinetic} active={slot.includes(weaponSlotCategory.kinetic)}>Kinetic</WeaponFilterButton>
            <WeaponFilterButton toggleFilter={toggleWeaponSlot} filter={weaponSlotCategory.energy}>Energy</WeaponFilterButton>
            <WeaponFilterButton toggleFilter={toggleWeaponSlot} filter={weaponSlotCategory.power}>Power</WeaponFilterButton>
        </div>
    )
}

export default WeaponFilter