import Layout from '../../components/Layout'
import PveFilter from '../../components/PveFilter'
//import { getPveActivities } from '../../../lib/destiny/pveFilter'
import { useEffect } from 'react'

export default function pve() {
    useEffect(() => {

    }, [])

    return (
        <Layout title={`Adventures`} description={`test description`}>
            <PveFilter />
        </Layout>
    )
}
