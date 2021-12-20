import Link from 'next/link';
import { GetServerSideProps, NextPage } from "next";
import fetch from "node-fetch";
import ErrorPage from "next/error";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { MHeader } from '@meetins/meetins/ui-shared';

// @ts-ignore
const UsersPage: NextPage = ({data}) => { 
        
    if (!data) {
      return <ErrorPage statusCode={404} />;
    }

    return (
        <>
            <MHeader title="This is the Users page"/>
            <Link href="/">
                Go to Home page
            </Link>

            <List style={{ width: '100%', maxWidth: 420 }}>
                { data.map( (item, i) => {
                    return (
                        <div key={item.id} >
                            <Link href={`/user/${item.id}`}>
                                <a>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={item.name}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.name}
                                            secondary={
                                            <>
                                                <Typography
                                                    style={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                >
                                                    {`${item.name} - `}
                                                </Typography>
                                                {item.email}
                                            </>
                                        }
                                        />
                                    </ListItem>
                                </a>
                            </Link>
                            <Divider variant="inset" component="li" />
                        </div>
                    )
                })}

            </List>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({
    params,
    res
  }) => {
    try {
      const result = await fetch(`http://localhost:4200/api/users`);
      const data = await result.json();
  
      return {
        props: { data }
      };
    } catch {
      res.statusCode = 404;
      return {
        props: {}
      };
    }
  };

export default UsersPage;