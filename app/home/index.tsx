import { Text, View } from "react-native";
import CurrentWeather from "../../src/components/CurrentWeather";

export default function HomeScreen() {
    return (
        <View>
            <Text>
                Home Screen
            </Text>
            <CurrentWeather/>
        </View>
    )
}