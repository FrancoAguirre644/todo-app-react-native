import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ListScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Tasks</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    }
})

export default ListScreen