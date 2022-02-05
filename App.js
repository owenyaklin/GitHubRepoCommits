import { useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

import ListItem from "./components/ListItem";

import getRepositoryCommits from './services/github';

const githubOwner = process.env.GITHUB_OWNER;
const githubRepo = process.env.GITHUB_REPO;

const PAGE_SIZE = 10;

export default function App() {
  const [commitsFetched, setCommitsFetched] = useState(false);
  const [commits, setCommits] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastCommitReached, setLastCommitReached] = useState(false);
  const [updateInProgress, setUpdateInProgress] = useState(false);

  // Run initial fetch on app load
  if (!commitsFetched) {
    // Get commits from GitHub
    getRepositoryCommits(githubOwner, githubRepo, PAGE_SIZE, pageNumber)
      .then(function (githubData) {
        setCommits(githubData);
        setUpdateInProgress(false);
        // At end of commit list if we fetch less than PAGE_SIZE
        if (githubData.length < PAGE_SIZE) {
          setLastCommitReached(true);
        }
      })
      .catch(function (fetchError) {
        console.log(fetchError);
        setUpdateInProgress(false);
      });
    // Prevent other data fetch until this is completed.
    setCommitsFetched(true);
    setUpdateInProgress(true);
  }

  const loadMoreCommits = async info => {
    // Only fetch more if not already fetching, and not already at end
    if (!(updateInProgress || lastCommitReached)) {
      let nextPage = pageNumber + 1;
      // Get commits from GitHub
      getRepositoryCommits(githubOwner, githubRepo, PAGE_SIZE, nextPage)
        .then(function (newData) {
          // Append new data to existing commits
          setCommits(commits.concat(newData));
          setUpdateInProgress(false);
          // At end of commit list if we fetch less than PAGE_SIZE
          if (newData.length < PAGE_SIZE) {
            setLastCommitReached(true);
          }
        })
        .catch(function (fetchError) {
          console.log(fetchError);
          setUpdateInProgress(false);
        });;
      setPageNumber(nextPage);
      // Prevent other data fetch until this is completed.
      setUpdateInProgress(true);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>Most recent commits for {githubOwner}/{githubRepo}</Text>
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
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
