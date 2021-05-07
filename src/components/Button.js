import React from "react"
import {Text, StyleSheet, TouchableOpacity} from "react-native";

const Button = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    button: {
        backgroundColor: "#ee3348",
        borderRadius: 5
    },
    text: {
        color: "#FFF",
        textAlign: "center",
        padding: 5,

    }
});


export default Button;