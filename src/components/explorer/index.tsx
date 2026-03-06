import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, Image, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { getToday } from "react-native-modern-datepicker";
import { useReservation } from "../../roomReserve/QuartoReservado";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/datePicker";
import InputSpin from "../ui/InputSpin";
import RoomCard from "../ui/RoomCard";
import { global } from "../ui/styles";
import TextField from "../ui/TextField";
import { useRouter } from "expo-router";

const addOneDay = (dateStr: string) => {
  const d = new Date(dateStr.replace(/\//g, "-")); 
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, "/"); 
};

const roomAmenities = [
  { label: "Café da manhã", icon: { lib: "FontAwesome5", name: "coffee" } },
  { label: "Academia", icon: { lib: "FontAwesome5", name: "dumbbell" } },
  { label: "Espaço Kids", icon: { lib: "FontAwesome5", name: "child" } },
  { label: "Wi-Fi", icon: { lib: "FontAwesome5", name: "wifi" } },
  { label: "Piscina", icon: { lib: "FontAwesome5", name: "swimming-pool" } },
];

const RenderExplorer = () => {
  const { width, height } = Dimensions.get("window");
  //useState() para gerenciar e alterar os estados
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState(1);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const closeCalendar = () => setCalendar(null);
  const { setReservation } = useReservation();

  const router = useRouter();
  
  return (
    <AuthContainer>
      {/*children */}
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginTop: height * 0.05 }}>
        {" "}
        {/*Essa View vocês tinham e eu só estilizei*/}
        <View style={{ display: "flex", flexDirection: "column" }}>
          {" "}
          {/*Criei esta nova View para check-in*/}
          {/* Input de checkIn para abrir calendário*/}
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View style={{ width: width * 0.8, maxWidth: 400, overflow: "hidden" }}>
              {" "}
              {/* Nova view para dar largura ao TextField */}
              <TextField
                label="Check-in"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Selecione a data"
                value={checkIn}
              />
            </View>{" "}
            {/* Fecha aqui */}
          </TouchableOpacity>
        </View>{" "}
        {/*View de check-in fecha aqui */}
        <View style={{ display: "flex", flexDirection: "column" }}>
          {" "}
          {/*Criei esta nova View para check-out*/}
          {/* Input de checkIn para abrir calendário*/}
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View style={{ width: width * 0.8 }}>
              {" "}
              {/* Nova view para dar largura ao TextField */}
              <TextField
                label="Check-out"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Selecione a data"
                value={checkOut}
              />
            </View>{" "}
            {/* Fecha aqui */}
          </TouchableOpacity>
        </View>
        {/*View do check-out que fecha aqui */}
        {/* InputSpin */}
        <View style={{ width: width * 0.8 }}>
          <Text style={global.label}>Quantidade de hóspedes</Text>
          <InputSpin onSelectSpin={(guests) => setQntGuests(guests)} />
        </View>
      </View>

      {/* RoomCard */}
      <RoomCard
        image={require("../../../assets/images/quartoruim.jpg")}
        label="Quarto horrível"
        icon={{ lib: "FontAwesome5", name: "bed" }}
        description={{
          title: "Características do quarto",
          text: "0 camas de casal\n1 cama de solteiro",
          price: 6.99,
        }}
        onReserve={() => {
    if (!checkIn || !checkOut) {
      alert("Você precisa selecionar check-in e check-out antes de reservar.");
      return;
    }
    setModalVisible(true);
  }}
      />

      {/* MODAL DO CALENDÁRIO */}
      <Modal transparent visible={calendar !== null} onRequestClose={closeCalendar}>
        <Pressable
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.29)" }}
          onPress={closeCalendar}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
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
      {/* Modal de confirmação */}
      <Modal
  animationType="slide"
  transparent
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
      paddingHorizontal: 20,
    }}
  >
    <View
      style={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
        Confirmação de Reserva
      </Text>

      <Image
        source={require("../../../assets/images/quartoruim.jpg")}
        style={{ width: "100%", height: 180, borderRadius: 8, marginBottom: 10 }}
      />

      <View style={{ marginBottom: 16 }}>
        <View
          style={{
            backgroundColor: "#f6f7fb",
            borderRadius: 16,
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ color: "#555" }}>Check-in</Text>
            <Text style={{ fontWeight: "600" }}>{checkIn}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ color: "#555" }}>Check-out</Text>
            <Text style={{ fontWeight: "600" }}>{checkOut}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#555" }}>Hóspedes</Text>
            <Text style={{ fontWeight: "600" }}>{qntGuests}</Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          Comodidades inclusas
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {roomAmenities.map((amenity, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#e6f0ff",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 16,
                marginBottom: 8,
              }}
            >
              <FontAwesome5
                name={amenity.icon.name}
                size={14}
                color="#064a8a"
                style={{ marginRight: 6 }}
              />
              <Text style={{ fontSize: 14, color: "#064a8a" }}>{amenity.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          marginBottom: 24,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#666" }}>Valor total</Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#1e90ff",
          }}
        >
          R$ 6,99
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#f6f7fb",
          borderRadius: 16,
          padding: 16,
          gap: 12,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#1e90ff",
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
          }}
          onPress={() => {
            setReservation({
              checkIn,
              checkOut,
              guests: qntGuests,
              room: {
                title: "Quarto horrível",
                price: 6.99,
                beds: ["0 camas de casal", "1 cama de solteiro"],
                image: require("../../../assets/images/quartoruim.jpg"),
              },
            });
            router.push({
              pathname: "/(tabs)/reservations",
              params: {
                label: "Quarto horrivel",
                price: 6.99,
                checkIn,
                checkOut,
                qntGuests,
              },
            });
            setModalVisible(false);
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Confirmar reserva
          </Text>
        </Pressable>

        <Pressable
          style={{
            paddingVertical: 14,
            alignItems: "center",
          }}
          onPress={() => setModalVisible(false)}
        >
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
