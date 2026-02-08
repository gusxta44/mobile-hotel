import { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View, Modal, Pressable, Image} from "react-native";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/datePicker";
import InputSpin from "../ui/InputSpin";
import RoomCard from "../ui/RoomCard";
import { global } from "../ui/styles";
import TextField from "../ui/TextField";
import { getToday } from "react-native-modern-datepicker";
import { FontAwesome5 } from "@expo/vector-icons";

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
<<<<<<< HEAD
  const [qntGuests, setQntGuests] = useState(1);
=======
  const [qntGuests, setQntGuests] = useState(" ");
>>>>>>> c6c86827f737ec821792ec645c51ea52e16986be
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const closeCalendar = () => setCalendar(null);

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
<<<<<<< HEAD
            <View style={{ width: width * 0.8, maxWidth: 400, overflow: "hidden" }}>
=======
            <View style={{ width: width * 0.8}}>
>>>>>>> c6c86827f737ec821792ec645c51ea52e16986be
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
<<<<<<< HEAD
          
          <View style={{ display: "flex", flexDirection: "column" }}>
            <TouchableOpacity
              onPress={() => {
                if (!checkIn) {
                  alert("Selecione o check-in primeiro");
                  return;
                }
                setCalendar("checkout");
              }}
            >
              <View style={{ width: width * 0.8 }}>
                <TextField
                  label="Check-out"
                  icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                  placeholder="Selecione a data"
                  value={checkOut}
                  editable={!!checkIn}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
=======
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View style={{ width: width * 0.8}}>
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
        {/* Modal para fechar calendário ao clicar fora */}
        <Modal
          transparent
          visible={calendar !== null}
          onRequestClose={closeCalendar}
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0, 0.29)",
            }}
            onPress={closeCalendar}
          >
             {/* Área do calendário que, ao clicar, não o fecha */}
            <Pressable 
              onPress={() => {}}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <DateSelector /> */}
              {calendar === "checkin" && (
                <DateSelector
                  onSelectDate={(date) => {
                    setCheckIn(date);
                    closeCalendar();
                  }}
                />
              )}
              {/* <DateSelector /> */}
              {calendar === "checkout" && (
                <DateSelector
                  onSelectDate={(date) => {
                    setCheckOut(date);
                    closeCalendar();
                  }}
                />
              )}
            </Pressable>
          </Pressable>
        </Modal>
>>>>>>> c6c86827f737ec821792ec645c51ea52e16986be

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
<<<<<<< HEAD
  transparent
  animationType="fade"
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View
    style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.65)",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: width * 0.9,
        backgroundColor: "#fff",
        borderRadius: 24,
        overflow: "hidden",
        elevation: 20,
      }}
    >
      {/* Header com imagem */}
      <View>
        <Image
          source={require("../../../assets/images/quartoruim.jpg")}
          style={{ width: "100%", height: 180 }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 12,
            left: 16,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            Quarto horrível
          </Text>
=======
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}>
          <View style={{
            width: width * 0.8,
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 20,
            alignItems: "center"
          }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
              Confirmação de Reserva
            </Text>
            <View style={{ width: 150, height: 100, borderRadius: 8, marginBottom: 12 }}>
            <Image source={require("../../../assets/images/quartoruim.jpg")} style={{ width: "100%", height: "100%", borderRadius: 8 }}/>
            </View>
            <Text>Quarto: Quarto horrivel</Text>
            <Text>Check-in: {checkIn || "Não selecionado"}</Text>
            <Text>Check-out: {checkOut || "Não selecionado"}</Text>
            <Text>Hóspedes: {qntGuests || "0"}</Text>
            <Text>Preço: R$ 6.99</Text>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Pressable
                style={{
                  backgroundColor: "#1e90ff",
                  padding: 10,
                  borderRadius: 8,
                  marginRight: 10,
                  minWidth: 80,
                  alignItems: "center"
                }}
                onPress={() => {
                  console.log("Reserva confirmada!", { checkIn, checkOut, qntGuests });
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Confirmar</Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: "#ccc",
                  padding: 10,
                  borderRadius: 8,
                  minWidth: 80,
                  alignItems: "center"
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#000", fontWeight: "bold" }}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
>>>>>>> c6c86827f737ec821792ec645c51ea52e16986be
        </View>
      </View>

      {/* Corpo do modal */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 16, color: "#333" }}>
          Informações da sua reserva:
        </Text>
        <View
      style={{
        marginTop: 16,
        backgroundColor: "#f6f7fb",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={{ color: "#555" }}>Check-in</Text>
        <Text style={{ fontWeight: "600" }}>
          {checkIn}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={{ color: "#555" }}>Check-out</Text>
        <Text style={{ fontWeight: "600" }}>
          {checkOut}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "#555" }}>Hóspedes</Text>
        <Text style={{ fontWeight: "600" }}>
          {qntGuests}
        </Text>
      </View>
    </View>

      {/*comodidades*/}
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
          Comodidades inclusas
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          {roomAmenities.map((amenity, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f6f7fb",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 12,
              }}
            >
              <Text style={{ marginRight: 6 }}>
                <FontAwesome5 name={amenity.icon.name} size={14} color="#064a8a" />
              </Text>
              <Text style={{ fontSize: 14, color: "#555" }}>{amenity.label}</Text>
            </View>
          ))}
        </View>
      </View>


        {/* Preço */}
        <View
          style={{
            marginTop: 20,
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

        {/* Botões */}
        <View
          style={{
            marginTop: 24,
            gap: 12,
            backgroundColor: "#f6f7fb",
            borderRadius: 16,
            padding: 16,
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
              console.log("Reserva confirmada", {
                checkIn,
                checkOut,
                qntGuests,
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
            <Text style={{ color: "#888", fontWeight: "600" }}>
              Cancelar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  </View>
</Modal>

    </AuthContainer>
  );
};
export default RenderExplorer;