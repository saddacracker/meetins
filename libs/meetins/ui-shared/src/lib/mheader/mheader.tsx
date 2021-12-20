import Typography from '@material-ui/core/Typography';
// import './mheader.module.scss';

export interface MHeaderProps {
    title: string
}

export const MHeader = (props: MHeaderProps) => {
    return (
        <Typography component="h1" variant="h2">
            {props.title}
        </Typography>
    )
};

export default MHeader;