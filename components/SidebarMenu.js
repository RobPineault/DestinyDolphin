import { useDispatch } from 'react-redux'
import { toggleSidebar } from '../redux/ducks/sidebar/sidebarSlice'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function SidebarMenu() {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(toggleSidebar())
    }
    return (
        <div className='container-row'>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleClick}
                edge="start"
                className={'menu-button'}
            >
                <MenuIcon />
            </IconButton>
            <div className="logo" />
        </div>
    )
}