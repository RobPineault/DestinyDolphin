//import { getInventory } from '../../lib/destiny/profile'
import Layout from '../../components/Layout'
import InventoryPage from '../../components/user/inventory/InventoryPage'
import SignInPage from '../../components/SignIn'
import { useSelector} from 'react-redux'

export default function inventory() {
    const signedIn = useSelector((state) => state.user.signedIn)
    return (
        <Layout title="Profile" description="User profile page">  
            { signedIn ? <InventoryPage /> : <SignInPage /> }
        </Layout>
    )
}