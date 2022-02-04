import { useState } from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Constants from 'expo-constants';

import ListItem from "./components/ListItem";

import getRepositoryCommits from './services/github';

const githubOwner = process.env.GITHUB_OWNER;
const githubRepo = process.env.GITHUB_REPO;

export default function App() {
  const [commitsFetched, setCommitsFeteched] = useState(false);
  const [commits, setCommits] = useState([]);

  if (!commitsFetched) {
    getRepositoryCommits(githubOwner, githubRepo)
      .then(function (githubData) {
        setCommits(githubData);
      });
    setCommitsFeteched(true);
  }

  const renderItem = ({ item }) => (
    <ListItem item={item} />
  );

  return (
    <View style={styles.container}>
      <View>
        <Text>Most recent commits for {githubOwner}/{githubRepo}</Text>
      </View>
      <FlatList
        data={commits}
        renderItem={renderItem}
        keyExtractor={item => item.hash}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight
  },
});
