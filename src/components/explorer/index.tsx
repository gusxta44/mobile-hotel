import { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View, Modal, Pressable} from "react-native";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/datePicker";
import InputSpin from "../ui/InputSpin";
import RoomCard from "../ui/RoomCard";
import { global } from "../ui/styles";
import TextField from "../ui/TextField";

const RenderExplorer = () => {
  const { width, height } = Dimensions.get("window");
  //useState() para gerenciar e alterar os estados
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState("");
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <AuthContainer>
      {/*children */}
      <View style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        {/*Essa View vocês tinham e eu só estilizei*/}
        <View style={{ display: "flex", flexDirection: "column" }}>
          {" "}
          {/*Criei esta nova View para check-in*/}
          {/* Input de checkIn para abrir calendário*/}
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View style={{ width: width * 0.8 }}>
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
          {/* <DateSelector /> */}
          {calendar === "checkin" && (
            <DateSelector
              onSelectDate={(date) => {
                setCheckIn(date);
                setCalendar(null);
              }}
            />
          )}
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
          {/* <DateSelector /> */}
          {calendar === "checkout" && (
            <DateSelector
              onSelectDate={(date) => {
                setCheckOut(date);
                setCalendar(null);
              }}
            />
          )}
        </View>
        {/*View do check-out que fecha aqui */}
        {/* InputSpin */}
        <View>
          <Text style={global.label}>Quantidade de hóspedes</Text>
          <InputSpin
            onSelectSpin={(guests) => {
              setQntGuests(guests);
            }}
          />
        </View>
      </View>
      <RoomCard
        image={require("../../../assets/images/quartoruim.jpg")}
        label="Quarto horrivel"
        icon={{ lib: "FontAwesome5", name: "bed" }}
        description={{
          title: "Características do quarto",
          text: "0 camas de casal\n1 cama de solteiro",
          price: 6.99
         }}
        onReserve={() => setModalVisible(true)} // abrir modal
      />
      {/* Modal de confirmação */}
      <Modal
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
        </View>
      </Modal>
    </AuthContainer>
  );
};
export default RenderExplorer;