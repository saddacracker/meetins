import React from 'react';
import { ApolloProvider } from "@apollo/client";

import { apolloClient } from '@meetins/meetins/utils';
import { MHeader } from '@meetins/meetins/ui-shared';
import { MeetingsList } from '@meetins/meetins/ui-shared';

import styles from "../../styles/meetings.module.css";
import headerStyles from "../../styles/mheader.module.scss";

const App = () => (
  <ApolloProvider client={apolloClient}>
    <MHeader title="Meetings" styles={headerStyles.container}/>
    <div className={styles.container}>
      <MeetingsList />
    </div>
  </ApolloProvider>
);

export default App;