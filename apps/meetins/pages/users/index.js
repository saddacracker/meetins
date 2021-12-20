import Link from 'next/link';
import fetch from "node-fetch";
import ErrorPage from "next/error";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { MHeader, MUserListItem } from '@meetins/meetins/ui-shared';

const UsersPage = ({data}) => { 
        
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
                            <MUserListItem 
                                id={item.id}
                                name={item.name}
                                email={item.email}
                            />
                            <Divider variant="inset" component="li" />
                        </div>
                    )
                })}

            </List>
        </>
    )
}

export const getServerSideProps = async ({
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