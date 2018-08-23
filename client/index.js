import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface} from 'apollo-client'; //backend
import { ApolloProvider } from 'react-apollo'; // glue btw apollo and react
import { Router, hashHistory, Route, IndexRoute} from 'react-router';
import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts:{
    credentials: 'same-origin'
  }
});
const client = new ApolloClient({
  networkInterface,
  // to store the fetched data in a cache
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history ={hashHistory}>
        <Route path="/" component ={App}>
          <Route path="login" component ={LoginForm}/>
          <Route path="signup" component ={SignupForm}/>
          <Route path="dashboard" component ={requireAuth(Dashboard)}/>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
