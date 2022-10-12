import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

export const client = new ApolloClient({
    // uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: process.env.NEXT_PUBLIC_API_URL,
    }),
});
