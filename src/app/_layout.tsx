// src/app/_layout.tsx
import { Slot } from "expo-router";
import { ReservationRoom } from "../roomReserve/QuartoReservado"; // ajuste o caminho se precisar

const RootLayout = () => {
  return (
    <ReservationRoom>
      <Slot />
    </ReservationRoom>
  );
};

export default RootLayout;
