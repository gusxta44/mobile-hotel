import React, { createContext, useContext, useState, ReactNode } from "react";

type Room = {
  title: string;
  price: number;
  beds: string[];
  image: string | number;
};

type Reservation = {
  checkIn: string;
  checkOut: string;
  guests: number;
  room?: Room;
};

type QuartoReservadoType = {
  reservation: Reservation | null;
  setReservation: (res: Reservation) => void;
  clearReservation: () => void;
};

const QuartoReservado = createContext<QuartoReservadoType | undefined>(undefined);

export const useReservation = () => {
  const context = useContext(QuartoReservado);

  if (!context) {
    throw new Error("useReservation must be used within ReservationRoom");
  }

  return context;
};

export const ReservationRoom = ({ children }: { children: ReactNode }) => {
  const [reservation, setReservationState] = useState<Reservation | null>(null);

  const setReservation = (res: Reservation) => {
    setReservationState(res);
  };

  const clearReservation = () => {
    setReservationState(null);
  };

  return (
    <QuartoReservado.Provider
      value={{ reservation, setReservation, clearReservation }}
    >
      {children}
    </QuartoReservado.Provider>
  );
};