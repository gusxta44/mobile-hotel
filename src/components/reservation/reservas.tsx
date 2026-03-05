import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Reservas = () => {

  const params = useLocalSearchParams();

  const { label, text, price, checkIn, checkOut, qntGuests } = params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{label}</Text>
      <Text>{text}</Text>
      <Text>Preço: R$ {price}</Text>
      <Text>Check-in: {checkIn}</Text>
      <Text>Check-out: {checkOut}</Text>
      <Text>Hóspedes: {qntGuests}</Text>
    </View>
  );
};

export default Reservas;