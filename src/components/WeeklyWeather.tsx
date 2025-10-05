import { Image, ScrollView, Text, View } from "react-native";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hooks";

export default function WeeklyWeather() {
    const weeklyWeather = useAppSelector((state: RootState) => state.weeklyData.weeklyWeather)
    return (
        <View>
            <ScrollView>
                {weeklyWeather.map((day, index) => (
                    <View>
                        <Text>{day.dayofweek}</Text>
                        <Text>{day.mintemp_c}℃</Text>
                        <Text>{day.maxtemp_c}℃</Text>
                        <Image source={{uri: `https:${day.icon}`}} style={{width: 32, height: 32}} resizeMode="contain" />
                        {day.daily_will_it_rain && <Text>{day.daily_chance_of_rain}%</Text>}
                        {day.daily_will_it_snow && <Text>{day.daily_chance_of_snow}%</Text>}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}