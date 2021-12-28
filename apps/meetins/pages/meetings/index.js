import { SetForm, SetList } from '@meetins/feature-sets';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import { MHeader } from '@meetins/meetins/ui-shared';
import styles from "../../styles/meetings.module.css";

const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <MHeader title="Meetings"/>
    <div className={styles.container}>
      <SetForm />
      <SetList />
    </div>
  </ApolloProvider>
);

export default App;