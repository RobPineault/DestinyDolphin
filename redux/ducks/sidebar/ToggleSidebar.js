import { connect } from 'react-redux'
import { toggleSidebar } from './sidebarSlice'

const mapDispatch = { toggleSidebar }

const ToggleSidebar = ({ toggleSidebar }) => {
    return (
        <button onClick={() => toggleSidebar()}>Add Todo</button>
    )
}

export default connect(
    null,
    mapDispatch
)(ToggleSidebar)
