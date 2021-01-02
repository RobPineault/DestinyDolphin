import Layout from '../components/Layout'
import ResetTimer from '../components/ResetTimer'
import FeatureArticle from '../components/FeatureArticle'
import Xur from '../components/Xur'
import Weekly from '../components/Weekly'
//import { getMembership } from '../lib/destiny/bungieAPI/user/initUser'
import { useEffect } from 'react'
import { Grid } from '@material-ui/core'
//import  BlogTextInfoContentStyle  from '../components/mui/BlogTextInfoContentStyle'


export default function Home() {
    useEffect(() => {


    }, [])

    return (
        <Layout title={`Home | Destiny Dolphin`} description={`test description`} >
            <Grid spacing={2} container >
                <Grid alignContent="space-between" container item xs={6}>
                    <Grid item xs="auto">
                        <ResetTimer />
                    </Grid>
                    <Grid spacing={2} container item xs={12}>
                        <Grid item xs={4}>
                            <Weekly title="Nightfall" />
                        </Grid>
                        <Grid item xs={4}>
                            <Weekly title="Nightfall" />
                        </Grid>
                        <Grid item xs={4}>
                            <Weekly title="Prime" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid spacing={2} container item xs={6}>
                    <Grid item xs={6}>
                        <Xur />
                    </Grid>
                    <Grid item xs={6}>
                        <Xur />
                        <div className="space" />
                    </Grid>
                    <Grid spacing={2} container item xs={12} className="article-container">
                        <Grid item xs={12}>
                            
                            <FeatureArticle title="best" />
                        </Grid>
                        <Grid item xs={12}>
                            <FeatureArticle title="destiny" />
                        </Grid>
                        <Grid item xs={12} >
                            <FeatureArticle title="destiny" />                            
                        </Grid>
                        <Grid item xs={12} >
                            <FeatureArticle title="destiny" />
                        </Grid>
                        <Grid item xs={12} >
                            <FeatureArticle title="destiny" />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="big-space" />
                        </Grid>
                </Grid>
            </Grid>
            <div className="space" />
            <Grid spacing={2} container >
                <Grid container item xs={6}>
                    <Grid item xs={12} >
                        <FeatureArticle title="Build a guide" />
                    </Grid>
                </Grid>
                <Grid container item xs={6}>
                    <Grid item xs={12} >
                        <FeatureArticle title="ad" />
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    )
}
