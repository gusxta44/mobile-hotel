import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useReservation } from "../../roomReserve/QuartoReservado";
import { styles } from "../ui/ReservationStyle";
import { useAuth } from "@/contexts/AuthContext";

const roomAmenities = [
  { label: "Café da manhã", icon: "coffee" },
  { label: "Academia", icon: "dumbbell" },
  { label: "Espaço Kids", icon: "child" },
  { label: "Wi-Fi", icon: "wifi" },
  { label: "Piscina", icon: "swimming-pool" },
];


const ReservationDetalhes = () => {
  const { reservation, clearReservation } = useReservation();
  const { reservarQuarto } = useAuth();
  const { width } = Dimensions.get("window");

  if (!reservation) return <Text style={styles.empty}>nenhuma reserva</Text>;

  const formatoBackend = (date: string) => {
  const [dia, mes, ano] = date.split("/");
  return `${ano}/${mes}/${dia}`;
};

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

  const handleConfirm = async () => {
  try {
    if (!reservation.room) return;

    const payload = {
      pagamento: "debido",
      quartos: [
        {
          id: reservation.room.id,
          data_inicio: formatoBackend(reservation.checkIn),
          data_fim: formatoBackend(reservation.checkOut),
        },
      ],
    };

    await reservarQuarto(payload);
    Alert.alert("Sucesso", "Reserva confirmada!");
    clearReservation();
  } catch (error: any) {
    Alert.alert("Erro", error.message || "Não foi possível reservar");
  }
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
        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirmar reserva</Text>
        </Pressable>
      </View>
    </View>
  );
};


export default ReservationDetalhes;
