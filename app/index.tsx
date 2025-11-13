import { router } from "expo-router";
import { Alert, Text, View } from "react-native";
import { regionService } from "../src/services/regionService";
import { useAppDispatch } from "../src/store/hooks";
import { setInitListState } from "../src/store/slices/initListSlice";
import { useEffect  } from "react";
import { getWeatherData } from "../src/features/weather/api";
import { setWeather } from "../src/store/slices/topWeatherSlice";
import { setHourlyWeather } from "../src/store/slices/hourlyWeatherSlice";
import { setWeeklyWeather } from "../src/store/slices/weeklyWeatherSlice";

export default function InitScreen() {
    const dispatch = useAppDispatch();
    
    const initApp = async () => {
        try {
            await regionService.createTable();
            await regionService.createCacheTable();
            await regionService.createTriggerOnUpdated();
            await regionService.createIndexRegions();
            const firstRegion = await initDatabase();

            if (firstRegion) { // 地域が存在する場合のみAPIを呼ぶ
                const data = await getWeatherData(firstRegion);
                dispatch(setWeather(data.topData));
                dispatch(setHourlyWeather(data.hourlyDataFormatted));
                dispatch(setWeeklyWeather(data.weeklyData));
            }
            router.replace("/(tab)/home");
        } catch (error) {
            console.error("Error initializing app:", error);
            Alert.alert("ERROR", `${error}`);
        }
    };

    const initDatabase = async () => {
        const regions = await regionService.getRegions();
        if (!regions.length) {
            await regionService.resetSequence();
            dispatch(setInitListState([]));
            return "Tokyo"; // デフォルト地域を返す、または空文字列
        } else {
            dispatch(setInitListState(regions));
            return regions[0].region; // 地域を返す
        }
    };

    useEffect(() => {
        initApp();
    }, []);

    return (
        <View>
            <Text>Initializing App.. </Text>
        </View>
    );
}
