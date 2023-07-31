import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './components/App/App';
import './styles/index.scss';

const client = new ApolloClient(
    {
        uri: 'https://api.github.com/graphql',
        cache: new InMemoryCache(),
        headers: {
            'Authorization': 'bearer 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', // Read ALL user profile data (read only token until Aug 29 2023)
        },
    },
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
);
