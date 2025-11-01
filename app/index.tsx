import { router } from "expo-router";
import { Alert, Text, View } from "react-native";
import { regionService } from "../src/services/regionService";
import { useAppDispatch } from "../src/store/hooks";
import { setInitListState } from "../src/store/slices/initListSlice";
import { useEffect } from "react";

export default function InitScreen() {

    useEffect(() => {
        initApp();
    }, []);

    const dispatch = useAppDispatch();
    const initApp = async () => {
    try {
        await regionService.createTable();
        await initDatabase();
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
        dispatch(setInitListState(regions));
    }
    
  };
  return (
    <View>
        <Text>Initializing App.. </Text>
    </View>
  );
}
