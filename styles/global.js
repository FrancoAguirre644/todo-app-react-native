import { Colors } from '../constants/index'

export default {
    loader: {
        marginTop: 20,
    },
    noData: {
        textAlign: 'center',
        fontSize: 18,
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    listItem: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderLeftWidth: 2,
        borderLeftColor: Colors.primary,
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.quaternary,
        borderStyle: 'solid',
        fontSize: 20,
        lineHeight: 28,
        marginBottom: 38,
        padding: 5,
    },
    swithContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 30
    },
    switchText: {
        fontSize: 18,
    }
}