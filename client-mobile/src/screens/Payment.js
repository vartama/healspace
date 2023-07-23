
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import HomeCard from "../components/HomeCard";
import { useDispatch, useSelector } from "react-redux"
import Loading from "../components/Loading";
import { WebView } from "react-native-webview"
import { useNavigation } from "@react-navigation/native";


export default function Payment({ route }) {
    const { paymentUrl } = route.params;
    // const dispatch = useDispatch();
    const navigation = useNavigation()
    console.log(route.params, 'ini line 13');
    const { loading, payment, successMessage } = useSelector((state) => state.order);


    const handleWebViewNavigationStateChange = (webState) => {
        console.log(webState, '<<<< state');
        if (webState?.url?.includes('orders/book/success')) {
            console.log('masuk success bos');
            navigation.navigate('ThankYou')
        }
    }
    return (
        <WebView
            style={{ flex: 1, marginTop: 20 }}
            originWhitelist={['*']}
            source={{ uri: paymentUrl }}
            onNavigationStateChange={handleWebViewNavigationStateChange} 
            domStorageEnabled={true}
        />
    )
}