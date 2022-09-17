import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Provider as StoreProvider } from 'react-redux';
import client from '../apollo/client';
import Layout from '../components/Layout';
import store from '../store/store';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <StoreProvider store={store}>
                <ThemeProvider enableSystem attribute="class">
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </StoreProvider>
        </ApolloProvider>
    );
}
