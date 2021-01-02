import useSWR from 'swr'
import { useUser } from '../context/userContext'
import { attributes, react as HomeContent } from '../content/sweet-pandas-eating-sweets.md';
import Layout from '../components/Layout'
const fetcher = (url, token) =>
    fetch(url, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json', token }),
        credentials: 'same-origin',
    }).then((res) => res.json())

const Profile = () => {
    const { user } = useUser()

    const { data, error } = useSWR(
        user ? ['/api/hello', user.token] : null,
        fetcher
    );
        let { title, description, tags } = attributes;
    return (
        <Layout title={title} description={description}>
                <h1>{title}</h1>
            <p>{description}</p>
            <HomeContent />
                <div>
                {tags.map(tag => {
                    return (<h6 key={ tag}>{ tag }</h6>)
                })}
                </div>
            </Layout>
        )
 
}

export default Profile