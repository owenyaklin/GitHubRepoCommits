import { StyleSheet, Text, View } from 'react-native';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function ListItem({ item }) {
    return (
        <View style={styles.listItemView}>
            <Text style={styles.listItemHeaderText}>Author:</Text>
            <Text style={styles.listItemText}>{item.author}</Text>
            <Text style={styles.listItemHeaderText}>Hash:</Text>
            <Text style={styles.listItemHashText}>{item.hash}</Text>
            <Text style={styles.listItemHeaderText}>Message:</Text>
            <Text style={styles.listItemText}>{item.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    listItemHashText: {
        fontSize: 14
    },
    listItemHeaderText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    listItemText: {
        fontSize: 20
    },
    listItemView: {
        backgroundColor: '#e0e0e0',
        borderColor: '#000000',
        borderRadius: 5,
        borderWidth: 1,
        margin: 3
    }
});