import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");

export const RoomStyle = StyleSheet.create({
  container: {
    marginTop: height * 0.03,
    backgroundColor: "#d7e1fdff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  image: {
    height: height * 0.2,
    width: "auto",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#120715ff",
    marginBottom: 4,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4A4AFF",
    marginLeft: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
  },

  icon: {
    marginRight: 10,
    marginTop: 6,
  },

  descriptionContainer: {
    flex: 1,
  },

  descriptionText: {
    color: "#555",
  },
});
