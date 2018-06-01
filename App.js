/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';



type Props = {};
export default class App extends Component<Props> {

  state = {
    items: [],
  }

  page = 0;

  fetchRepositories(){
    const newPage = this.page + 1;
    fetch(`https://api.github.com/search/repositories?q=react&page=${newPage}`)
      .then((response) => response.json())
      .then(({ items }) => {
        this.page = newPage;
        this.setState( { items: [...this.state.items, ...items] });
        console.log(this.items);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity  style={{marginTop: 20}} onPress={() => this.fetchRepositories()}>
          <Text>Fetch</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => <Text style={{margin:20}}>{item.name}</Text>}
          keyExtractor={(item) => item.id}
          onEndReached={() => this.fetchRepositories()}
          onEndReachedThreshould={0.1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

});
