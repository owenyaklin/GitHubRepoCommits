import { useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

import ListItem from "./components/ListItem";

import getRepositoryCommits from './services/github';

const githubOwner = process.env.GITHUB_OWNER;
const githubRepo = process.env.GITHUB_REPO;

const PAGE_SIZE = 10;

export default function App() {
  const [commitsFetched, setCommitsFeteched] = useState(false);
  const [commits, setCommits] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastCommitReached, setLastCommitReached] = useState(false);
  const [updateInProgress, setUpdateInProgress] = useState(false);

  if (!commitsFetched) {
    getRepositoryCommits(githubOwner, githubRepo, PAGE_SIZE, pageNumber)
      .then(function (githubData) {
        setCommits(githubData);
        setUpdateInProgress(false);
        if (githubData.length < PAGE_SIZE) {
          setLastCommitReached(true);
        }
      })
      .catch(function (fetchError) {
        setUpdateInProgress(false);
      });
    setCommitsFeteched(true);
    setUpdateInProgress(true);
  }

  const loadMoreCommits = async info => {
    if (!(updateInProgress || lastCommitReached)) {
      let nextPage = pageNumber + 1;
      getRepositoryCommits(githubOwner, githubRepo, PAGE_SIZE, nextPage)
        .then(function (newData) {
          setCommits(commits.concat(newData));
          setUpdateInProgress(false);
          if (newData.length < PAGE_SIZE) {
            setLastCommitReached(true);
          }
        })
        .catch(function (fetchError) {
          setUpdateInProgress(false);
        });;
      setPageNumber(nextPage);
      setUpdateInProgress(true);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Most recent commits for {githubOwner}/{githubRepo}</Text>
      </View>
      <FlatList
        data={commits}
        renderItem={renderItem}
        keyExtractor={item => item.hash}
        onEndReachedThreshold={0.1}
        onEndReached={info => {
          loadMoreCommits(info);
        }}
      />
    </SafeAreaView >
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
