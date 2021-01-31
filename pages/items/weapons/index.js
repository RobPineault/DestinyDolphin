import Layout from '../../../components/Layout'
import WeaponDB from '../../../components/items/WeaponDB'



export default function WeaponsPage() {

    return (
        <Layout title={`Home | Destiny Dolphin`} description={`test description`}>
            <WeaponDB />
        </Layout>
    )
}