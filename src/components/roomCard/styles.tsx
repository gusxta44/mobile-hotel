import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10,
    width: 200,

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  image: {
    width: "100%",
    height: 120,
  },

  infoSection: {
    padding: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  price: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },

  rating: {
    fontSize: 12,
    color: "#777",
  },
});
