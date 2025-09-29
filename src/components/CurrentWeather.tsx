import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";


const CurrentWeather = () => {
    const currentWeather = useAppSelector((state: RootState) => state.weather.currentWeather);
    return (
        <View style={styles.container}>
            {currentWeather.location.name ?
                <View style={styles.inner}>
                    <Text style={styles.location}>{currentWeather.location.name}</Text>
                    <Text style={styles.temp}>{currentWeather.current.temp_c}℃</Text>
                    <View style={{flexDirection: "row", columnGap: 8, marginVertical: 8}}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={{alignItems: "center"}}>
                            {["M", "A", "X"].map((char, index) => (
                                <Text key={index} style={{height: 12,fontSize: 12, fontWeight: 600, lineHeight: 10}}>
                                    {char}
                                </Text>
                            ))}
                            </View>
                            <Text style={{fontSize: 26}}>{currentWeather.forecast.forecastday[0].day.maxtemp_c}℃</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={{alignItems: "center"}}>
                            {["M","I","N"].map((char, index) => (
                                <Text key={index} style={{height: 12, fontSize: 12, fontWeight: 600, lineHeight: 10}}>
                                    {char}
                                </Text>
                            ))}
                            </View>
                            <Text style={{fontSize: 26}}>{currentWeather.forecast.forecastday[0].day.mintemp_c}℃</Text>
                        </View>
                    </View>
                    <Text style={styles.condition}>{currentWeather.current.condition.text}</Text>
                    <Image 
                        source={{
                            uri: `https:${currentWeather.current.condition.icon}`  
                        }}
                        style={{width: 100, height: 100, marginTop: 4}}
                        resizeMode="contain"
                    />
                </View>
                :
                <Text style={{fontSize: 16}}>No weather data. Please Input Your Location.</Text>
            }
        </View>
    );
};

export default CurrentWeather;

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        borderRadius: 16,
        backgroundColor: "#eaeaea"
    },
    inner: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 16, 
    },
    location: {
        fontSize: 32,
        fontWeight: "bold",
    },
    temp: {
        fontSize: 52,
        fontWeight: "bold",
    },
    condition: {
        fontSize: 24,
        fontWeight: "semibold"
    }
    
})