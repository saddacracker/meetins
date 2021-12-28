import Typography from '@material-ui/core/Typography';

export const MHeader = (props) => {
    return (
        <header style={props.container}>
            <Typography component="h1" variant="h3">
                {props.title}
            </Typography>
        </header>
    )
};

export default MHeader;