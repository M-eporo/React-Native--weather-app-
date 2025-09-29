import { StyleSheet, Text, View } from "react-native";
import CurrentWeather from "../../src/components/CurrentWeather";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "../../src/components/Input";
import TimelyWeather from "../../src/components/TimelyWeather";

export default function HomeScreen() {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Text>
                    Home Screen
                </Text>
                <Input />
                <CurrentWeather/>
                <TimelyWeather/>
            </View>
        </SafeAreaProvider>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    }
})