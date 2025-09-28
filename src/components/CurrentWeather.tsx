import { Image, ScrollView, Text, View } from "react-native";
import Input from "./Input";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";


const CurrentWeather = () => {
    const currentWeather = useAppSelector((state: RootState) => state.weather.currentWeather);
    return (
        <View>
            <View>
                <Input />
            </View>
            <View>
                <Text>{currentWeather.location.name}</Text>
                <Text>{currentWeather.current.temp_c}℃</Text>
                <Text>{currentWeather.current.condition.text}</Text>
                <Image 
                    source={{
                        uri: `https:${currentWeather.current.condition.icon}`  
                    }}
                    style={{width: 80, height: 80}}
                    resizeMode="contain"
                />
            </View>

        </View>
    );
};

export default CurrentWeather;