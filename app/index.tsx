import { router } from "expo-router";
import { Alert, Text, View } from "react-native";
import { regionService } from "../src/services/regionService";
import { useAppDispatch } from "../src/store/hooks";
import { setInitListState } from "../src/store/slices/initListSlice";
import { useEffect, useState  } from "react";
import { getWeatherData } from "../src/features/weather/api";

export default function InitScreen() {
    const dispatch = useAppDispatch();
    const [firstRegion, setFirstRegion] = useState<string>("");
    
    const initApp = async () => {
        try {
            await regionService.createTable();
            await initDatabase();
            await getWeatherData(firstRegion || "Tokyo");
            router.replace("/(tab)/home");
        } catch (error) {
            console.error("Error initializing app:", error);
            Alert.alert("ERROR", "Failed to initialize the app, please try again.", [
                {
                    text: "Retry",
                    onPress: () => initApp(),
                },
            ]);
        }
    };

    const initDatabase = async () => {
        const regions = await regionService.getRegions();
        if (!regions.length) {
            await regionService.resetSequence();
            dispatch(setInitListState([]));
        } else {
            setFirstRegion(regions[0].region);
            dispatch(setInitListState(regions));
        }
    };

    useEffect(() => {
        initApp();
    }, [initApp]);

    return (
        <View>
            <Text>Initializing App.. </Text>
        </View>
    );
}
