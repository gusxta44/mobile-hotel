import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 20,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1e90ff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    color: "#555",
    fontSize: 14,
  },
  value: {
    fontWeight: "600",
    fontSize: 14,
  },
  amenitiesTitle: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  amenities: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  amenity: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f7fb",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
    marginRight: 8,
  },
  amenityLabel: {
    fontSize: 12,
    color: "#555",
    marginLeft: 6,
  },
  price: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e90ff",
    textAlign: "right",
  },
  deleteButton: {
    marginTop: 16,
    backgroundColor: "#ff4d4d",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
