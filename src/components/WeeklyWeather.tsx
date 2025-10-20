import { Animated, Image, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hooks";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRef, useState } from "react";
import { Expand } from "./Expand";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { moons } from "../utils/moonShape";
import { ExpandControl } from "./ExpandCotrol";

export default function WeeklyWeather() {
    const weeklyWeather = useAppSelector((state: RootState) => state.weeklyData.weeklyWeather);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [moon, setMoon] = useState("");
    
    const handleToggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
            <View style={styles.container}>
                <Text>Weekly Weather</Text>
                {weeklyWeather.map((day, index) => (
                    <View key={index}>
                        <View style={styles.inner}>
                            
                            <View style={{alignItems: "center"}}>
                                <Text>{`${day.date.substring(5).replace("-", " / ")}`}</Text>
                                <Text>{`(${day.dayofweek})`}</Text>
                            </View>
                            <View>
                                <Image source={{uri: `https:${day.icon}`}} style={[styles.img, {width: 32, height: 32}]} resizeMode="contain" />
                            </View>
                            <View style={{alignItems: "flex-start"}}>
                                <Text>MAX {day.mintemp_c}℃</Text>
                                <Text>MIN {day.maxtemp_c}℃</Text>
                            </View>
                            {day.daily_will_it_rain || day.daily_will_it_snow && (
                            <View style={{alignItems: "flex-start"}}>
                                {day.daily_will_it_rain && <Text>{`${day.daily_chance_of_rain}%`}</Text>}
                                {day.daily_will_it_snow && <Text>{`${day.daily_chance_of_snow}%`}</Text>}
                            </View>)}
                            
                            <TouchableOpacity style={styles.icons} onPress={() => handleToggle(index)}>
                                
                                <ExpandControl isOpen={index === openIndex} >
                                    <AntDesign name="plus" size={20} color="black" />
                                </ExpandControl>
                                
                            </TouchableOpacity>
                            
                        </View>
                        <Expand isOpen={index === openIndex}>
                            <View>
                                <MaterialCommunityIcons name="weather-sunset" size={24} color="red" />
                                <Text>Sunrise at {day.sunrise}</Text>
                                <Text>Sunset at {day.sunset}</Text>
                            </View>
                            <View>
                                <MaterialCommunityIcons name="weather-moonset" size={24} color="gold" />
                                <Text>Moonrise at {day.moonrise}</Text>
                                <Text>Moonset at {day.moonset}</Text>
                            </View>
                            {day.daily_will_it_rain || day.daily_will_it_snow && (
                                <View>
                                    {day.daily_will_it_rain && (
                                        <View>
                                            <MaterialCommunityIcons name="weather-pouring" size={24} color="blue" />
                                            <Text>Total precip {day.totalprecip_mm}mm</Text>
                                        </View>
                                    )}
                                    {day.daily_will_it_rain && (
                                        <View>
                                            <MaterialCommunityIcons name="weather-snowy" size={24} color="white" />
                                            <Text>Total snow {day.totalsnow_cm}cm</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                            <View>
                                <MaterialCommunityIcons name="weather-dust" size={24} color="green" />
                                <Text>Max wind {day.maxwind_kph}kph</Text>
                            </View>
                            <View>
                                <MaterialCommunityIcons name="water-thermometer-outline" size={24} color="lightblue" />
                                <Text>Avg humidity {day.avghumidity}%</Text>
                            </View>
                            <View>
                                <MaterialCommunityIcons name="weather-fog" size={24} color="gray" />
                                <Text>Avg Visibility {day.avgvis_km}km</Text>
                            </View>
                            <Text>{day.moon_phase}</Text>
                            
                            <MaterialCommunityIcons 
                                name={moons.find(moon => moon.name === day.moon_phase)?.type}
                                size={24} 
                                color="gold" 
                            />
                        </Expand>
                    </View>
                ))}
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: "#eaeaea",
    },
    inner: {
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderColor: "#aeaeae",
        borderBottomWidth: 1,
        
    },
    date: {
        
        backgroundColor: "#fff",
    },
    img: {},
    icons: {
        flexDirection: "row",
        //transform: "rotate(0deg)"
    },
})