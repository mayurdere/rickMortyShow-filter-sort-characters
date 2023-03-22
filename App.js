import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyStack from './src/navigation/navigator';
import Config from "react-native-config";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

console.log(Config.GRAPHQL_URL);
const client = new ApolloClient({
  uri: `${Config.GRAPHQL_URL}`,
  cache: new InMemoryCache(),
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});



const Stack = createStackNavigator();



export default function App() {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
    </ApolloProvider>
  );
}
