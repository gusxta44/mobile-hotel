import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useReservation } from "../../roomReserve/QuartoReservado";
import { styles } from "../ui/ReservationStyle";

const roomAmenities = [
  { label: "Café da manhã", icon: "coffee" },
  { label: "Academia", icon: "dumbbell" },
  { label: "Espaço Kids", icon: "child" },
  { label: "Wi-Fi", icon: "wifi" },
  { label: "Piscina", icon: "swimming-pool" },
];

const ReservationDetalhes = () => {
  const { reservation, clearReservation } = useReservation();
  const { width } = Dimensions.get("window");

  if (!reservation) return <Text style={styles.empty}>nenhuma reserva</Text>;

  const handleDelete = () => {
    Alert.alert(
      "Excluir reserva",
      "Tem certeza que deseja remover esta reserva?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => clearReservation() },
      ]
    );
  };

  return (
    <View style={[styles.card, { width: width * 0.9 }]}>
      {reservation.room?.image && (
        <Image
        source={typeof reservation.room.image === "string" ? { uri: reservation.room.image } : reservation.room.image}
        style={styles.image}
      />
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{reservation.room?.title}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Check-in:</Text>
          <Text style={styles.value}>{reservation.checkIn}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Check-out:</Text>
          <Text style={styles.value}>{reservation.checkOut}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Hóspedes:</Text>
          <Text style={styles.value}>{reservation.guests}</Text>
        </View>

        {/* Comodidades */}
        <Text style={styles.amenitiesTitle}>Comodidades inclusas:</Text>
        <View style={styles.amenities}>
          {roomAmenities.map((amenity, index) => (
            <View key={index} style={styles.amenity}>
              <FontAwesome5 name={amenity.icon as any} size={14} color="#064a8a" />
              <Text style={styles.amenityLabel}>{amenity.label}</Text>
            </View>
          ))}
        </View>

        {/* Preço */}
        <Text style={styles.price}>R$ {reservation.room?.price.toFixed(2)}</Text>

        {/* Botão de excluir */}
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Excluir reserva</Text>
        </Pressable>
      </View>
    </View>
  );
};


export default ReservationDetalhes;
