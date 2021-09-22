import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import globalStyles from "../styles/global";
import { useDispatch } from "react-redux";
import CustomButton from "../components/CustomButtom";
import Tasks from "../components/Tasks";
import { getTasks } from '../store/actions/taskActions';
import { setActiveListId } from '../store/actions/listActions';

const ListScreen = ({ navigation, route }) => {

    const [loading, setLoading] = useState(true)
    const { id } = route.params
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks(() => setLoading(false)))
    }, [dispatch])

    useEffect(() => {
        dispatch(setActiveListId(id))
    }, [dispatch, id])

    if (loading) {
        return <ActivityIndicator color={Colors.primary} size="large" style={globalStyles.loader} />
    }

    return (
        <View style={styles.container}>
            <Tasks navigation={navigation} listId={id} />
            <CustomButton text="Add new task" icon="add" iconColor="#fff" onPress={() => navigation.navigate('NewTask')} />
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