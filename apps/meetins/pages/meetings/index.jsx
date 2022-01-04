import React from 'react';
import {
    ApolloProvider,
    gql,
    useQuery
} from "@apollo/client";
import { client } from '@meetins/data-access';
import { MHeader } from '@meetins/meetins/ui-shared';
import styles from "../../styles/meetings.module.css";
import headerStyles from "../../styles/mheader.module.scss";

const LIST_ALL_MEETINGS = gql`
  query ListMeetings {
    listMeetings {
      id
      name
      day
      updated
      rating
      reviews
      notes
      types
      time
      end_time
      address
    }
  }
`

const Meetings = () => {
  const { loading, error, data } = useQuery(LIST_ALL_MEETINGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "3fr 1fr 1fr 50%"
    }}>
      {data.listMeetings.map(meeting => (
        <React.Fragment key={meeting.id}>
          <div>{meeting.name}</div>
          <div>{meeting.day}</div>
          <div>{meeting.time}</div>
          <div>{meeting.rating}</div>
        </React.Fragment>
      ))}
    </div>
  );
}

const App = () => (
  <ApolloProvider client={client}>
    <MHeader title="Meetings" styles={headerStyles.container}/>
    <div className={styles.container}>
      <Meetings />
    </div>
  </ApolloProvider>
);

export default App;