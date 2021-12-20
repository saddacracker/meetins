import Link from 'next/link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

/* eslint-disable-next-line */
export interface MUserListItemProps {
  id: string,
  name: string,
  email: string,
}

export function MUserListItem(props: MUserListItemProps) {
  return (
    <Link href={`/user/${props.id}`}>
        <a>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={props.name}/>
                </ListItemAvatar>
                <ListItemText
                    primary={props.name}
                    secondary={
                    <>
                        <Typography
                            style={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                        >
                            {`${props.name} - `}
                        </Typography>
                        {props.email}
                    </>
                }
                />
            </ListItem>
        </a>
    </Link>
  );
}

export default MUserListItem;
