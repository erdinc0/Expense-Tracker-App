import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../Components/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import Renkler from "../Constants/Renkler";

const Error = ({ message, onPress }) => {
  return (
    <View style={styles.mainContainer}>
      <CustomText style={styles.text}>Bir hata ile karşılaşıldı! </CustomText>
      <CustomText>{message}</CustomText>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.butonView}>
          <CustomText>Tamam</CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Renkler.primary700,
  },
  butonView: {
    padding: 30,
    backgroundColor: Renkler.primary400,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
