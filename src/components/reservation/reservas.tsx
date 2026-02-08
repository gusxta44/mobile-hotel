import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const RenderReservas = () => {
  const route = useRoute();
  const { quarto } = route.params as any; 

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{quarto.label}</Text>
      <Text>{quarto.description.text}</Text>
      <Text>Preço: R$ {quarto.description.price}</Text>
      <Text>Check-in: {quarto.checkIn}</Text>
      <Text>Check-out: {quarto.checkOut}</Text>
      <Text>Hóspedes: {quarto.qntGuests}</Text>
    </View>
  );
};

export default RenderReservas;