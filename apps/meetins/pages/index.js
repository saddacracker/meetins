import { useUser } from '@auth0/nextjs-auth0';
import styles from './index.module.scss';
import { Card, CardContent } from '@material-ui/core';

import Link from 'next/link';

export function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  console.log('user', user);

  if (user) {
    return (
      <div className={styles.page}>
        <div className="wrapper">
          <div className="container">
            
            <div id="welcome">
              <h1>
                <span> Hello there, {user.given_name}</span>
                Welcome to meetins 👋
              </h1>
            </div>
  
            <Card>
              <CardContent>
                <h2>Card Content</h2>
                <div>
                  <Link href="/about">
                    Go to About page
                  </Link>
                </div>
                <div>
                  <Link href="/users">
                    Go to Users page
                  </Link>
                </div>
              </CardContent>
            </Card>

            <a href="/api/auth/logout">Logout</a>
          </div>
        </div>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;


}

export default Index;
