import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";

const config = require('../../../../../env.json');

export const client = new ApolloClient({
    headers: {
        "Content-Type": "application/json",
        "x-api-key": config.NX_AWS_API_KEY
    },
    uri: config.NX_AWS_SERVERLESS_QRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
});

export default client;