import Typography from '@material-ui/core/Typography';

export interface MHeaderProps {
    title: string
}

export const MHeader = (props: MHeaderProps) => {
    return (
        <Typography component="h1" variant="h3">
            {props.title}
        </Typography>
    )
};

export default MHeader;