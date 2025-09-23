import { ScrollView, Text, View } from "react-native";
import Input from "./Input";
import { useAppSelector } from "../store/hooks";
import { CurrentWeatherType } from "../types/weather";
import { RootState } from "../store/store";


const CurrentWeather = () => {
    const currentWeather = useAppSelector((state: RootState) => state.weather.currentWeather);

    return (
        <View>
            <View>
                <Input />
            </View>
            <ScrollView>
                <Text>{currentWeather.location.name}</Text>

            </ScrollView>
        </View>
    );
};

export default CurrentWeather;