import * as React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Dimensions } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <View style={styles.indicatorWrapper}>
                <ActivityIndicator size="large" style={styles.indicator} />
                <Text style={styles.indicatorText}>Loading...</Text>
            </View>
        </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicatorWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        marginBottom: 10,
    },
    indicatorText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Loading;