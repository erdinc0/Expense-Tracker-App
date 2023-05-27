import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomText = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});
