import { StyleSheet } from "react-native";

const containerColor = "#000000";
const headerColor = "#323C48";
const contentColor = "#CCC";
const scrollColor = "#F0F8FF";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: containerColor
  },
  content: {
    height: 150,
    backgroundColor: contentColor,
    paddingTop: 250,
    alignItems: "center"
  },
  header: {
    backgroundColor: headerColor,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  scrollView: {
    backgroundColor: scrollColor
  },
  uploadVideo: {
    width: 120,
    height: 40,
    backgroundColor: scrollColor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  }
});
