import styles from './index.module.scss';
import { Card, CardContent } from '@material-ui/core';

import Link from 'next/link';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome meetins 👋
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

        </div>
      </div>
    </div>
  );
}

export default Index;
