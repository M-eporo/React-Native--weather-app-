import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hooks";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRef, useState } from "react";
import { Dimensions } from "react-native";

export default function WeeklyWeather() {
    const weeklyWeather = useAppSelector((state: RootState) => state.weeklyData.weeklyWeather);
    const [isOpen, setIsOpen] = useState(false);
    //const {height, width} = useWindowDimensions();
    const { height } = Dimensions.get("window");
    const slideAnim = useRef(new Animated.Value(0)).current;
    console.log(slideAnim);

    const toggleDrawer = () => {
        Animated.timing(slideAnim, {
            toValue: isOpen ? 0 : -300,
            duration: 600,
            useNativeDriver: true,
        }).start();
        setIsOpen(!isOpen);
    }
    return (
            <View style={styles.container}>
                <Text>Weekly Weather</Text>
                {weeklyWeather.map((day, index) => (
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
                        <View style={{alignItems: "flex-start"}}>
                            {day.daily_will_it_rain ? <Text>`${day.daily_chance_of_rain}%`</Text> : null}
                            {day.daily_will_it_snow ? <Text>`${day.daily_chance_of_snow}%`</Text> : null}
                        </View>
                        <TouchableOpacity onPress={toggleDrawer} style={styles.icons}>
                            <AntDesign name="close" size={20} color="black" />
                            <AntDesign name="plus" size={20} color="black" />
                        </TouchableOpacity>

                        <Animated.View
                            style={[
                                styles.drawer,
                                { transform: [{translateY: slideAnim}]} 
                            ]}
                        >
                            <View style={styles.drawerContent}>
                                <Text>Drawer content</Text>
                            </View>
                        </Animated.View>
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
    icons: {
        flexDirection: "row",
        backgroundColor: "#fff",
    },
    drawer: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 300,
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 6,
        elevation: 8,
    },
    drawerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})