import PropTypes from 'prop-types';

const WeaponFilterButton = ({ toggleFilter, filter, active }) => (        
        <button
            onClick={() => toggleFilter(filter)}
            disabled={active}
            style={{
                marginLeft: '4px'
            }}
        >
            {children}
        </button>
    )

WeaponFilterButton.propTypes = {
    toggleFilter: PropTypes.func.isRequired,
    filter: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
}

export default WeaponFilterButton