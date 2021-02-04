//import useSWR from 'swr'
//import { attributes, react as HomeContent } from '../content/sweet-pandas-eating-sweets.md';

import Layout from '../components/Layout'
const fetcher = (url, token) =>
    fetch(url, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json', token }),
        credentials: 'same-origin',
    }).then((res) => res.json())

const Profile = () => {

       // let { title, description, tags } = attributes;
    return (
        <Layout title={"post"} description={"a post"}>
                
            </Layout>
        )
 
}

export default Profile
/*<HomeContent />
 * <h1>{title}</h1>
            <p>{description}</p>

                <div>
                {tags.map(tag => {
                    return (<h6 key={ tag}>{ tag }</h6>)
                })}
                </div>
 */