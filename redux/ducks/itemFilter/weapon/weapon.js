import PropTypes from 'prop-types'

const Item = ({ name, description, iconLink }) => (
    <button
        onClick={() => setVisibilityFilter(filter)}
        disabled={active}
        style={{
            marginLeft: '4px'
        }}
    >
        {children}
    </button>
)

Item.propTypes = {
    name: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    setVisibilityFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
}

export default Item