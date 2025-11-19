import { View, StyleSheet, ScrollView } from 'react-native';
import RenderDatePicker from "@/components/ui/datePicker";
import RoomCard from "@/components/ui/RoomCard";


export default function Explorer() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RenderDatePicker />

      <RoomCard
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
});
