import { Card, Typography } from '@material-ui/core'


export default function Weekly({ title }) {

    return (
        <Card variant="outlined" className="weekly">
            <Typography variant="h5" color="textPrimary">
                {title}
            </Typography>
        </Card>
    )
}