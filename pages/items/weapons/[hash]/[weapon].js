//import { useRouter } from 'next/router'
//import ErrorPage from 'next/error'
import Layout from '../../../../components/Layout'
//import { fetchItemData } from '../../../../lib/destiny/bungieAPI/staticRequests'
import { loadItem } from '../../../../lib/destiny/bungieAPI/storage'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'


export default function weapon({ hash }) {
    //const router = useRouter()
    //const { hash } = router.query
    const [weapon, setWeapon] = useState()
    const path = 'https://www.bungie.net/'
    useEffect(() => {
        loadItem(hash).then(weapon => {
            console.log(weapon)
            setWeapon(weapon)
        })    
    }, [])

    /*
    if (!router.isFallback && !weapon?.hash) {
        return <ErrorPage statusCode={404} />
    }*/
    
    return (
        <Layout>
            {!weapon ? (
                <p>Loading...</p>
            ) : (
                    <>
                        <Grid container component={Card}>
                            <Grid container item xs={8}>
                                <Grid item xs={4}>
                                    <img src={path + weapon.displayProperties.icon} />
                                </Grid>
                                <Grid item xs={8}>
                                    <CardContent>
                                        <Typography variant="h2" color="textPrimary">
                                            {weapon.displayProperties.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Slot | Type | Energy? | Frame
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            RPM
                                        </Typography>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {weapon.displayProperties.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={4}>
                                <Grid item xs={12}>
                                    <div className="rating">
                                    <Typography variant="body2" color="textSecondary" component="p">
                                            PVE *  *  *  *  *
                                    </Typography>
                                    </div>

                                </Grid>
                                <Grid item xs={12}>
                                    <div className="rating">
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            PVP *  *  *  *  *
                                    </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div className="space" />
                        <Grid container component={Card}>
                            <Grid container item xs={6}>
                                <Grid item xs="auto">
                                    <div className="circle" />
                                    <div className="circle" />
                                    <div className="circle" />
                                    <div className="circle" />
                                </Grid>
                                <Grid item xs="auto">
                                    <div className="circle" />
                                    <div className="circle" />
                                    <div className="circle" />
                                    <div className="circle" />
                                </Grid>
                                <Grid item xs="auto">
                                    <div className="circle" />
                                    <div className="circle" />
                                    <div className="circle" />
                                    <div className="circle" />
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid wrap="nowrap" container item xs={12}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Perk 1
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Perk 2
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Perk 3
                                    </Typography>
                                </Grid>
                                <Grid  item xs={12}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Impact
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Range
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Stability
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Handling
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Reload Speed
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                </>
                )}
        </Layout>
    )
}

export async function getStaticProps({ params }) {    
        return {
            props: {
                hash: params.hash
            }
        }
}

export async function getStaticPaths() {
    // Get the paths we want to pre-render based on users
    //request manifest links
    //const weapons = await fetchItemData("weapon")
    //hash: weapon.hash,
    const fakeWeapons = [{ hash: '321', name: "654" }]
    return {
        paths: fakeWeapons.map((weapon) => {
            return {
                params: {                       
                    weapon: weapon.name,    
                    hash: weapon.hash, 
                },
            }
        }),
        fallback: false,
    }
}