import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { HourlyWeatherItem } from "../types/hourlyWeather";

export default function TimelyWeather() {
    const hourlyWeather = useAppSelector((state: RootState) => state.hourlyData.hourlyWeather);

    return (
        <View style={styles.container}>
                {hourlyWeather.length <= 0 ?
                    <Text style={styles.alertText}>No Hour Data Available. Please Enter Your Location.</Text>
                :
                <ScrollView style={styles.horizontalScroll} horizontal>
                    {hourlyWeather.map((hour: HourlyWeatherItem, index: number) => (
                        <View key={hour.time} style={styles.hourContainer}>
                            <Text style={styles.time}>{hour.time}</Text>
                            <Text style={styles.temp_c}>{hour.temp_c}℃</Text>
                            <Image
                                source={{uri: `https:${hour.icon}`}}
                                style={[{width: 52, height: 52}, styles.img]}
                                resizeMode="contain"
                            />
                            {hour.will_it_rain && <Text style={styles.rain}>{hour.chance_of_rain}%</Text>}
                            {hour.will_it_snow && <Text style={styles.snow}>{hour.chance_of_snow}%</Text>}
                        </View>
                    ))}
                </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: "#eaeaea",
    },
    alertText: {
        textAlign: "center",
        paddingVertical: 24
    },
    horizontalScroll: {
        paddingVertical: 8,
    },
    hourContainer: {
        alignItems: "center",
        paddingHorizontal: 8,
    },
    time: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    temp_c: {
        marginTop: 6,
        marginBottom: 10,
        fontWeight: "bold",
    },
    img: {

    },
    rain: {
        fontWeight: "bold",
        color: "blue",
    },
    snow: {
        fontWeight: "bold",
        color: "lightblue",
    }
});