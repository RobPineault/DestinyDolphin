import useSWR from 'swr'
//import { useUser } from '../context/userContext'
const fetcher = (url, token) =>
    fetch(url, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json', token }),
        credentials: 'same-origin',
    }).then((res) =>  res.json() )

const Loadouts = () => {
    //const { user } = useUser()

    const { data, error } = useSWR('/api/getManifestData', fetcher)
    if (data) {
        console.log(data);
    }    
    return (
        <div>
            <p>WIP</p>
            {error && <div>Failed to fetch item!</div>}
            {data && !error ? (
                <div>test data: {data.beep}.</div>
            ) : (
                    <div>Loading...</div>
                )}
        </div>
    )
}

export default Loadouts