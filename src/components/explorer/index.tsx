import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Dimensions, Image, Modal, Pressable, Text, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
import { getToday } from "react-native-modern-datepicker";
import { useReservation } from "../../roomReserve/QuartoReservado";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/datePicker";
import InputSpin from "../ui/InputSpin";
import RoomCard from "../ui/RoomCard";
import { global } from "../ui/styles";
import TextField from "../ui/TextField";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

//adiciona um dia(para cálculo de check-out minimoo)
const addOneDay = (dateStr: string) => {
  const d = new Date(dateStr.replace(/\//g, "-"));
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, "/");
};

// Lista de comodidades dos quartos
const roomAmenities = [
  { label: "Café da manhã", icon: { lib: "FontAwesome5", name: "coffee" } },
  { label: "Academia", icon: { lib: "FontAwesome5", name: "dumbbell" } },
  { label: "Espaço Kids", icon: { lib: "FontAwesome5", name: "child" } },
  { label: "Wi-Fi", icon: { lib: "FontAwesome5", name: "wifi" } },
  { label: "Piscina", icon: { lib: "FontAwesome5", name: "swimming-pool" } },
];

const RenderExplorer = () => {
  const { width, height } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState(1);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const { consulta } = useAuth();
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeCalendar = () => setCalendar(null);
  const { setReservation } = useReservation();
  const router = useRouter();

  //Funcao para consultar quartos disponiveis
  const handleConsulta = async () => {
    try {
      // Validacoes
      if (!checkIn || !checkOut) {
        Alert.alert("Atenção", "Por favor, selecione as datas de check-in e check-out");
        return;
      }

      // verifica se check out é posterior ao check-in
      const dateCheckIn = new Date(checkIn.replace(/\//g, "-"));
      const dateCheckOut = new Date(checkOut.replace(/\//g, "-"));
      if (dateCheckOut <= dateCheckIn) {
        Alert.alert("A data de check-out deve ser posterior a data de check-in");
        return;
      }

      setLoading(true);
      setRooms([]); 
      const result = await consulta(checkIn, checkOut, qntGuests);
      setRooms(result);

      if (result.length === 0) {
        Alert.alert("Sem disponibilidade", "Não há quartos disponíveis para o período selecionado. Tente outras datas.");
      }
    } catch (erro: any) {
      setRooms([]); //limpa quartos em caso de erro
      Alert.alert("Erro ao consultar quartos", erro?.message || "Não foi possível buscar quartos disponíveis. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      {/* Titulo da tela */}
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#03293f" }}>
        Agende seus quartos
      </Text>
    
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 25, marginTop: height * 0.05 }}>
        {/* Check-in */}
        <View style={{ width: width * 0.8, maxWidth: 400 }}>
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <TextField
              label="Check-in"
              icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
              placeholder="Selecione a data"
              value={checkIn}
            />
          </TouchableOpacity>
        </View>

        {/* Check-out */}
        <View style={{ width: width * 0.8, maxWidth: 400 }}>
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <TextField
              label="Check-out"
              icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
              placeholder="Selecione a data"
              value={checkOut}
            />
          </TouchableOpacity>
        </View>

        {/* Quantidade de hóspedes */}
        <View style={{ width: width * 0.8 }}>
          <Text style={global.label}>Quantidade de hóspedes</Text>
          <InputSpin onSelectSpin={(guests) => setQntGuests(guests)} />
        </View>

        {/* Botão para consultar quartos */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: width * 0.9,
            marginTop: height * 0.02,
            backgroundColor: "#03293f",
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            elevation: 3,
          }}
          onPress={handleConsulta}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "600" }}>
              Consultar quartos
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Lista de quartos disponíveis */}
      <View style={{ marginTop: 20, gap: 12 }}>
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            image={{ uri: room.imagem }}
            label={room.nome}
            icon={{ lib: "FontAwesome5", name: "bed" }}
            description={{ title: "Características do quarto", text: room.descricao, price: room.preco }}
            onReserve={() => {
              if (!checkIn || !checkOut) {
                Alert.alert("Erro", "Selecione check-in e check-out");
                return;
              }
              setSelectedRoom(room);
              setModalVisible(true);
            }}
          />
        ))}
      </View>

      {/* Modal Calendário */}
      <Modal transparent visible={calendar !== null} onRequestClose={closeCalendar}>
        <Pressable
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.29)" }}
          onPress={closeCalendar}
        >
          <View>
            {calendar === "checkin" && (
              <DateSelector
                minimumDate={getToday()}
                onSelectDate={(date) => {
                  setCheckIn(date);
                  if (checkOut && checkOut <= date) setCheckOut("");
                  closeCalendar();
                }}
              />
            )}
            {calendar === "checkout" && (
              <DateSelector
                minimumDate={checkIn ? addOneDay(checkIn) : getToday()}
                onSelectDate={(date) => {
                  setCheckOut(date);
                  closeCalendar();
                }}
              />
            )}
          </View>
        </Pressable>
      </Modal>

      {/* Modal Confirmação de Reserva */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", paddingHorizontal: 20 }}>
          <View style={{ width: "100%", backgroundColor: "#fff", borderRadius: 12, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>Confirmação de Reserva</Text>
            <Image
              source={{ uri: selectedRoom?.imagem }}
              style={{ width: "100%", height: 180, borderRadius: 8, marginBottom: 10 }}
            />

            {/* Detalhes da reserva */}
            <View style={{ marginBottom: 16, backgroundColor: "#f6f7fb", borderRadius: 16, padding: 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Text style={{ color: "#555" }}>Check-in</Text>
                <Text style={{ fontWeight: "600" }}>{checkIn}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Text style={{ color: "#555" }}>Check-out</Text>
                <Text style={{ fontWeight: "600" }}>{checkOut}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#555" }}>Hóspedes</Text>
                <Text style={{ fontWeight: "600" }}>{qntGuests}</Text>
              </View>
            </View>

            {/* Comodidades inclusas */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>Comodidades inclusas</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                {roomAmenities.map((amenity, index) => (
                  <View key={index} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#e6f0ff", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, marginBottom: 8 }}>
                    <FontAwesome5 name={amenity.icon.name} size={14} color="#064a8a" style={{ marginRight: 6 }} />
                    <Text style={{ fontSize: 14, color: "#064a8a" }}>{amenity.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Valor total */}
            <View style={{ marginBottom: 24, alignItems: "center" }}>
              <Text style={{ color: "#666" }}>Valor total</Text>
              <Text style={{ fontSize: 32, fontWeight: "bold", color: "#1e90ff" }}>
                R$ {selectedRoom?.preco.toFixed(2)}
              </Text>
            </View>

            {/* Botões de ação */}
            <View style={{ backgroundColor: "#f6f7fb", borderRadius: 16, padding: 16, gap: 12 }}>
              <Pressable
                style={{ backgroundColor: "#1e90ff", paddingVertical: 16, borderRadius: 16, alignItems: "center" }}
                onPress={() => {
                  if (!selectedRoom) return;
                  setReservation({
                    checkIn,
                    checkOut,
                    guests: qntGuests,
                    room: { id: selectedRoom.id, title: selectedRoom.nome, price: selectedRoom.preco, beds: ["1 cama casal"], image: selectedRoom.imagem },
                  });
                  router.push({
                    pathname: "/(tabs)/reservations",
                    params: { label: selectedRoom?.nome, price: selectedRoom?.preco, checkIn, checkOut, qntGuests },
                  });
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Confirmar reserva</Text>
              </Pressable>

              <Pressable style={{ paddingVertical: 14, alignItems: "center" }} onPress={() => setModalVisible(false)}>
                <Text style={{ color: "#888", fontWeight: "600" }}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </AuthContainer>
  );
};


export default RenderExplorer;