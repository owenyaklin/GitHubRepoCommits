import { StyleSheet, Text, View } from 'react-native';

const githubOwner = process.env.GITHUB_OWNER;
const githubRepo = process.env.GITHUB_REPO;

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Most recent commits for {githubOwner}/{githubRepo} </Text>
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
