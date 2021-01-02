import { Card, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box';

export default function Xur() {
    return (
        <Box className="xur" bgcolor="info.main" >
            {props =>
                <Card variant="outlined" {...props} >
                    <Typography variant="h5" color="textPrimary">
                        Location: Titan
            </Typography>
                </Card>
            }
            </Box>
    )
}