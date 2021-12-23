import { SetForm, SetList } from '@meetins/feature-sets';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import React from 'react';
// import './app.css';

const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <h1>My Lego Sets</h1>
    <div className="flex">
      <SetForm />
      <SetList />
    </div>
  </ApolloProvider>
);

export default App;