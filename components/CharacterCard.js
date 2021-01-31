import { Typography } from "@material-ui/core"

const path = 'https://www.bungie.net'
export default function CharacterCard({ character }) {
    // const { data } = useSelector(() => state.user.character)
    return (
        <>
            <div className="emblem-container">
                <img src={path + character.emblem.emblemBackgroundPath} alt="character" className="emblem" />
                <div className="emblem-content">
                    <Typography variant="body2" color="textPrimary">
                        {character.class}
                    </Typography>
                </div>
            </div>
        </>
    );
}