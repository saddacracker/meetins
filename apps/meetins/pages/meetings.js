import { SetForm, SetList } from '@meetins/feature-sets';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import Typography from '@material-ui/core/Typography';

const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Typography component="h1" variant="h3">Add a Meeting</Typography>
    <div className="flex">
      <SetForm />
      <SetList />
    </div>
  </ApolloProvider>
);

export default App;