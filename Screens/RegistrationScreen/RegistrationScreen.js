import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RegistrationScreen = ()=> {
    return (
    <View style={styles.container}>
      <Text style={styles.text}>Registration</Text>
    </View>
    );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
    container: {
        
    },
    text: {
        fontFamily: 'Roboto',
        fontStyle: normal,
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 35,
        textAlign: center,
        letterSpacing: 0.01,
    }
});