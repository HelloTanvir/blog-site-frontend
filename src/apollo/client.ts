import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.NEXT_APP_API_URL,
    cache: InMemoryCache(),
});

export default client;
