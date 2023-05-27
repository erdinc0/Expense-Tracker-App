import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import Renkler from "../Constants/Renkler";

const Loading = () => {
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator size="large" color={Renkler.primary50} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Renkler.primary700,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
