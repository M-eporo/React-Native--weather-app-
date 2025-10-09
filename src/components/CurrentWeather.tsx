import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";

const CurrentWeather = () => {
    const currentWeather = useAppSelector((state: RootState) => state.currentData.currentWeather);
    return (
        <View style={styles.container}>
            {currentWeather.name ?
                <View style={styles.inner}>
                    <Text style={styles.location}>{currentWeather.name}</Text>
                    <Text style={styles.temp}>{currentWeather.temp_c}℃</Text>
                    <View style={{flexDirection: "row", columnGap: 20, marginVertical: 8}}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={{alignItems: "center"}}>
                            {["M", "A", "X"].map((char, index) => (
                                <Text key={index} style={styles.verticalText}>
                                    {char}
                                </Text>
                            ))}
                            </View>
                            <Text style={{fontSize: 26}}>{currentWeather.maxtemp_c}℃</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}> 
                            
                            <View style={{alignItems: "center"}}>
                            {["M","I","N"].map((char, index) => (
                                <Text key={index} style={styles.verticalText}>
                                    {char}
                                </Text>
                            ))}
                            </View>
                            <Text style={{fontSize: 26}}>{currentWeather.mintemp_c}℃</Text>
                        </View>
                    </View>
                    <Text style={styles.condition}>{currentWeather.condition}</Text>
                    <Image 
                        source={{
                            uri: `https:${currentWeather.icon}`  
                        }}
                        style={{width: 100, height: 100, marginTop: 4}}
                        resizeMode="contain"
                    />
                </View>
                :
                <Text style={styles.alertText}>No weather data. Please Input Your Location.</Text>
            }
        </View>
    );
};

export default CurrentWeather;

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        borderRadius: 16,
        backgroundColor: "#eaeaea"
    },
    inner: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 16, 
    },
    alertText: {
        paddingVertical: 24,
        textAlign: "center"
    },
    location: {
        fontSize: 32,
        fontWeight: "bold",
    },
    verticalText: {
        height: 12, 
        marginRight: 8, 
        fontSize: 12, 
        fontWeight: 600, 
        lineHeight: 10
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