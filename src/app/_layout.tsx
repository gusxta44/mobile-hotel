import AuthProvider from "@/contexts/AuthContext";
import { ReservationRoom } from "@/roomReserve/QuartoReservado"; // ajuste o caminho conforme necessário
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <AuthProvider>
      <ReservationRoom>
        <Stack screenOptions={{ headerShown: false }} />
      </ReservationRoom>
    </AuthProvider>
  );
};

export default RootLayout;