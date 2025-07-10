import { useTheme } from "@/theme"
import { StyleSheet } from "react-native"

export const useStyle = () => { 
    const {colors} = useTheme()
    return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Dark background
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 8,
  },
  backArrow: {
    fontSize: 24,
    color: "#fff",
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: 30,
    marginVertical: 16,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabText: {
    color: colors.white,
    fontWeight: "500",
  },
  activeTab: {
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: "600",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    // paddingBottom: 120,
  },
  card: {
    backgroundColor: "#7B45F0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    marginTop: 20
  },
  price: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
  features: {
    marginVertical: 8,
  },
  featureItem: {
    paddingVertical: 10,
    paddingLeft: 10,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  featureText: {
    color: "#fff",
    fontSize: 14,
  },
  buttonContainer: {
    // position: "absolute",
    // bottom: 20,
    // left: 16,
    // right: 16,
    marginTop: 30
  },
  continueButton: {
    backgroundColor: colors.black,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.white,
  },
  continueButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
  upgradeButton: {
    backgroundColor: "#7B45F0",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  upgradeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
})}
