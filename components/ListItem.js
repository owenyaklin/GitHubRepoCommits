import { StyleSheet, Text, View } from 'react-native';

export default function ListItem({ item }) {
    return (
        <View>
            <Text style={styles.viewText}>{item.author}</Text>
            <Text style={styles.viewText}>{item.hash}</Text>
            <Text style={styles.viewText}>{item.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewText: {
        fontSize: 20
    }
});