import { Card, Typography } from '@material-ui/core'
//import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
export default function FeatureArticle({ title }) {
    return (
        <Box className="featured-article" >
            {props => <Card raised={true}  {...props}>
                <Typography variant="h5">
                    {title}
                </Typography>
            </Card>}            
            </Box>
    )
}
