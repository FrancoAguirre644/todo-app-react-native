import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import globalStyles from '../styles/global'

const Lists = ({ navigation }) => {

    const { lists } = useSelector(state => state.list)

    const itemClickHandler = (item) => {
        navigation.navigate('List', { name: item.name, id: item.id })
    }

    return (
        <View style={styles.container}>
            {
                lists.length > 0 ? <FlatList
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={globalStyles.listContainer}

                    data={lists}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={globalStyles.listItem} onPress={() => itemClickHandler(item)}>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>}
                /> : <Text style={globalStyles.noData}>No lists</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        flex: 1
    },
    itemText: {
        fontSize: 16,
        color: '#000'
    }
})

export default Lists