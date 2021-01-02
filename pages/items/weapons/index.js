
import Layout from '../../../components/Layout'
import ItemFilter from '../../../components/ItemFilter'

import { useEffect } from 'react'
export default function Home() {
    useEffect(() => {

    }, [])

    return (
        <Layout title={`Home | Destiny Dolphin`} description={`test description`}>
                <ItemFilter type="weapon" />
        </Layout>
    )
}