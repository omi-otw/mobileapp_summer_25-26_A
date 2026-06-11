import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ThemedText style={styles.title}>Hello, Mobile App Development</ThemedText>
            <ThemedText style={styles.subtitle}>Semester: Summer 25-26</ThemedText>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#0D1F4E",
        margin: 5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0D1F4E",
        margin: 5,
    },
});
