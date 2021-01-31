import { Button } from '@material-ui/core';

const FilterGroup = ({ toggle, activeButtons, filterCategory, filterEnum }) => {
    function isActive(value) {
        if (activeButtons) {
            return activeButtons.includes(value) ? 'active' : ''
        }
        return ''
    }
    return (
        <div className="container-column">
            {Object.keys(filterEnum).map(filter => {
                if (filter != "None" && filter != "Unknown" && filter != "Raid" && filter != "Currency") {
                    return (
                        <Button
                            key={filter}
                            
                            className={isActive(filterEnum[filter])}
                            onClick={() => toggle(filterCategory, filterEnum[filter])}
                        >{filter.replace(/([A-Z])/g, ' $1').trim()}</Button>
                    )
                }
            })}
        </div>
    )
}

export default FilterGroup