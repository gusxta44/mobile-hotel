import styles from "@/components/roomCard/styles";
import React from "react";
import { Image, Text, View } from "react-native";

const RoomCard = () => {
  return (
    <View style={styles.card}>

      <Image
        source={{ uri:"https://picsum.photos/200/300"}}
        style={styles.image}
      />

      <View style={styles.infoSection}>
        <Text style={styles.title}>quarto ruim</Text>

        <Text style={styles.price}>
          R$ 20 por 3 noites
        </Text>

        <Text style={styles.rating}>
          ⭐ ---
        </Text>
      </View>

    </View>
  );
}

export default RoomCard;
