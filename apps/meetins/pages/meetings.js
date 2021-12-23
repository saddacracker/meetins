// import { SetForm, SetList } from '@meetins/feature-sets';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import Typography from '@material-ui/core/Typography';

// import './app.css';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
//   uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
        <p>
            {currency}: {rate}
        </p>
        </div>
    ));
}

const App = () => (
  <ApolloProvider client={client}>
    <Typography component="h1" variant="h3">My Exchange Rates</Typography>
    <div className="flex">
      {/* <SetForm />
      <SetList /> */}
      <ExchangeRates />
    </div>
  </ApolloProvider>
);

export default App;