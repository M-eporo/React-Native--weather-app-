import { Text, View } from "react-native";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hooks";

export default function WeeklyWeather() {
    const weeklyWeather = useAppSelector((state: RootState) => state.weeklyData.weeklyWeather)
    return (
        <View>
            <Text>Weekly Weather</Text>
        </View>
    );
}