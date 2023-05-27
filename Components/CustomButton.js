import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Renkler from "../Constants/Renkler";

const CustomButton = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Renkler.primary500,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flat: {
    backgroundColor: "transparent",
  },
  flatText: {
    color: Renkler.primary200,
  },
});
