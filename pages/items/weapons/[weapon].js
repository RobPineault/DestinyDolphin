import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../../components/Layout'
import { getData, getItemByHash } from '../../../lib/utils/api'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'

export default function weapon({ weapon }) {
    const router = useRouter()
    if (!router.isFallback && !weapon?.hash) {
        return <ErrorPage statusCode={404} />
    }
    return (
        <Layout>
            {router.isFallback ? (
                <p>Loading…</p>
            ) : (
                    <>
                        <Grid container component={Card}>
                            <Grid container item xs={8}>
                                <Grid item xs={4}>
                                    <img src={weapon.img} />
                                </Grid>
                                <Grid item xs={8}>
                                    <CardContent>
                                        <Typography variant="h2" color="textPrimary">
                                            { weapon.name}
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
                                        Description
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
                                <Grid direction="column" item xs="auto">
                                    <div className="circle" />
                                    <div className="circle" />
                                    <div className="circle" />
                                    <div className="circle" />
                                </Grid>
                                <Grid direction="column" item xs="auto">
                                    <div className="circle" />
                                    <div className="circle" />
                                    <div className="circle" />
                                    <div className="circle" />
                                </Grid>
                                <Grid direction="column" item xs="auto">
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
    const weapon = getItemByHash(params.weapon, 'weapons')
    if (weapon) {
        return {
            props: {
                weapon: weapon
            }
        }
    }
}

export async function getStaticPaths() {
    // Get the paths we want to pre-render based on users
    const weaponData = getData('weapons');
    return {
        paths: weaponData.map((weapon) => {
            return {
                params: {
                    weapon: weapon.hash.toString(),
                },
            }
        }),
        fallback: false,
    }
}