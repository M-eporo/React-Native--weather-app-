import { ScrollView, Text, View } from "react-native";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";

export default function TimelyWeather() {
    const hourlyWeather = useAppSelector((state: RootState) => state.hourlyData.hourlyWeather);

    return (
        <View>
            <Text>Timely Weather</Text>
            <ScrollView horizontal>
                {hourlyWeather.length <= 0 ?
                    <Text>No Hour Data Available. Please Enter Your Location.</Text>
                :
                    {hourlyWeather.map((hour, index) => (
                        
                    ))}
                }
            </ScrollView>
        </View>
    )
}