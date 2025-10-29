import { ScrollView, StyleSheet, Text, View } from "react-native";
import CurrentWeather from "../../../src/components/CurrentWeather";
import Input from "../../../src/components/Input";
import HourlyWeather from "../../../src/components/HourlyWeather";
import WeeklyWeather from "../../../src/components/WeeklyWeather";
export default function HomeScreen() {
    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={{
                paddingBottom: 32
            }}
        >
            <Input />
            <CurrentWeather />
            <HourlyWeather />
            <WeeklyWeather />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    }
})