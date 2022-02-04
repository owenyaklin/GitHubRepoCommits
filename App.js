import { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';

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

  return (
    <View style={styles.container}>
      <Text>Most recent commits for {githubOwner}/{githubRepo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 5
  },
});
