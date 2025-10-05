import { ScrollView, StyleSheet, Text, View } from "react-native";
import CurrentWeather from "../../src/components/CurrentWeather";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "../../src/components/Input";
import HourlyWeather from "../../src/components/HourlyWeather";
import WeeklyWeather from "../../src/components/WeeklyWeather";

export default function HomeScreen() {
    return (
        <SafeAreaProvider>
            <ScrollView style={styles.container}>
                <Text>
                    Home Screen
                </Text>
                <Input />
                <CurrentWeather />
                <HourlyWeather />
                <WeeklyWeather />
            </ScrollView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    }
})