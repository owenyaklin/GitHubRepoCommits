import { StyleSheet, Text, View } from 'react-native';

export default function ListItem({ item }) {
    return (
        <View>
            <Text>{item.author}</Text>
            <Text>{item.hash}</Text>
            <Text>{item.message}</Text>
        </View>
    );
};